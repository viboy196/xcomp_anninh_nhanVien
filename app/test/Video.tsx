import React, {useEffect, useRef, useState} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  MediaStream,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
// import Video from './components/Video';
import Utils from '../utils';
import GettingCall from '../screens/GettingCall';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

// // import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/Ionicons';

import Video from '../components/Video';

// const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
const configuration = {
  iceServers: [
    {urls: ['stun:hk-turn1.xirsys.com']},
    {
      username:
        'x8w5WLKrzM-Syir6HnFKQFG6y1sobLQpOTkAIM3Lj8xbuPo3UeIQzAQN3Q0HW18AAAAAAGJTyEx2aWJveTE5Ng==',
      credential: '420db210-b95f-11ec-b5af-0242ac120004',
      urls: [
        'turn:hk-turn1.xirsys.com:80?transport=udp',
        'turn:hk-turn1.xirsys.com:3478?transport=udp',
        'turn:hk-turn1.xirsys.com:80?transport=tcp',
        'turn:hk-turn1.xirsys.com:3478?transport=tcp',
        'turns:hk-turn1.xirsys.com:443?transport=tcp',
        'turns:hk-turn1.xirsys.com:5349?transport=tcp',
      ],
    },
  ],
};

export default function App() {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [gettingCall, setGetTingCall] = useState(false);
  const [roomId, setRoomId] = useState('');
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  // const cRef = useRef(
  //   firebase.firestore().collection('meet').doc(`chatID_${roomId}`),
  // );
  const cRef =
    useRef<
      FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
    >();
  useEffect(() => {
    const subscribe = async () => {
      if (cRef.current) {
        cRef.current.onSnapshot(snapShot => {
          const data = snapShot.data();
          if (data === undefined) {
            console.log('data underfined');
            setGetTingCall(false);
            return;
          }
          if (data !== undefined) {
            const ls = Object.keys(data as object);
            console.log('subscribe', Object.keys(data as object), data);
            const index = ls.findIndex(x => x === 'offer');
            if (index >= 0 && !connecting.current) {
              if (!gettingCall) {
                setGetTingCall(true);
              }
            }
            console.log(index);
          }
          const answer = data?.answer;
          if (pc.current && !pc.current.remoteDescription && data && answer) {
            pc.current.setRemoteDescription(new RTCSessionDescription(answer));
          }
          // If there is offer for chatId set the getting call flag
          if (data && data.offer && !connecting.current) {
            setGetTingCall(true);
          }
        });
      }
    };
    // On Delete of collection call hangup
    // the other side has clicked on hangup
    const subscribeDelete = async () => {
      if (cRef.current) {
        cRef.current.collection('callee').onSnapshot(snapShot => {
          snapShot.docChanges().forEach(async change => {
            if (change.type === 'removed') {
              setGetTingCall(false);
              connecting.current = false;
              cRef.current = firebase
                .firestore()
                .collection('meet')
                .doc(`chatID_${roomId}`);
              const calleeCandidate = await cRef.current
                .collection('callee')
                .get();
              calleeCandidate.forEach(async candidate => {
                await candidate.ref.delete();
              });
              const callerCandidate = await cRef.current
                .collection('caller')
                .get();
              callerCandidate.forEach(async candidate => {
                await candidate.ref.delete();
              });
              cRef.current.delete();

              if (localStream) {
                localStream.getTracks().forEach(t => t.stop);
                localStream.release();
              }
              setLocalStream(undefined);
              setRemoteStream(undefined);
              setRoomId('');
            }
            // Helper function
          });
        });
      }
    };
    return () => {
      subscribe();
      subscribeDelete();
    };
  }, [gettingCall, localStream, roomId]);
  const setupWebRtc = async () => {
    pc.current = new RTCPeerConnection(configuration);
    // lấy luồng stream âm thanh và video
    const stream = await Utils.getStream();

    if (stream) {
      setLocalStream(stream);
      pc.current.addStream(stream);
    }

    pc.current.onaddstream = e => {
      const _e = e as any;
      const _stream = _e.stream as MediaStream;
      console.log('onaddstream _stream', _stream.toURL());

      if (_stream) {
        setRemoteStream(_stream);
      }
    };
    // get the remote stream once it is available
  };

  const create = async () => {
    console.log('gọi ....');
    connecting.current = true;
    cRef.current = firebase
      .firestore()
      .collection('meet')
      .doc(`chatID_${roomId}`);
    // setup webRtc
    await setupWebRtc();

    // document for the call
    // Exchange the ICE candidates between the call and callee
    collectIceCandidates(cRef.current, 'caller', 'callee');
    if (pc.current) {
      // create the offer for the call
      const offer = (await pc.current.createOffer({})) as RTCSessionDescription;
      pc.current.setLocalDescription(offer);

      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };

      cRef.current.set(cWithOffer);
    }
  };

  const join = async () => {
    console.log('join zoom ....');
    connecting.current = true;
    setGetTingCall(false);
    cRef.current = firebase
      .firestore()
      .collection('meet')
      .doc(`chatID_${roomId}`);
    const offer = (await cRef.current.get()).data()?.offer;

    if (offer) {
      await setupWebRtc();

      collectIceCandidates(cRef.current, 'callee', 'caller');
      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));

        // create answer for the call
        // update document with answer
        const answer =
          (await pc.current.createAnswer()) as RTCSessionDescription;
        pc.current.setLocalDescription(answer);
        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        cRef.current.update(cWithAnswer);
      }
    }
  };

  /**
   * for disconnecting the call close the connection , release the stream
   * And delete the document for the call
   */
  const hangup = async () => {
    setGetTingCall(false);
    connecting.current = false;
    firestoreCleanUp();
    streamCleanUp();
    if (pc.current) {
      pc.current.close();
    }
  };

  const firestoreCleanUp = async () => {
    cRef.current = firebase
      .firestore()
      .collection('meet')
      .doc(`chatID_${roomId}`);
    const calleeCandidate = await cRef.current.collection('callee').get();
    calleeCandidate.forEach(async candidate => {
      await candidate.ref.delete();
    });
    const callerCandidate = await cRef.current.collection('caller').get();
    callerCandidate.forEach(async candidate => {
      await candidate.ref.delete();
    });
    cRef.current.delete();
  };
  // Helper function
  const streamCleanUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop);
      localStream.release();
    }
    setLocalStream(undefined);
    setRemoteStream(undefined);
  };

  const collectIceCandidates = async (
    mReft: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string,
  ) => {
    const candidateCollection = mReft.collection(localName);
    if (pc.current) {
      // lắng nghe sự kiện có stream vào connection

      // khi có sự kiện icecandidate
      // thêm môt ice candidate vào firestore
      pc.current.onicecandidate = event => {
        const _event = event as any;
        console.log('on icecandidate ', _event.candidate);
        if (_event.candidate) {
          candidateCollection.add(_event.candidate);
        }
      };
      // get candidate to signal
      mReft.collection(remoteName).onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change: any) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.current?.addIceCandidate(candidate);
          }
        });
      });
    }
  };

  // hiển thị màn hình chờ
  if (gettingCall) {
    return <GettingCall hangup={hangup} join={join} />;
  } else if (localStream) {
    // hiển thị màn hình call
    return (
      <Video
        hangup={hangup}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    );
  } else {
    // còn lại hiển thị nút gọi
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={create} style={styles.button}>
            <Text>gọi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={join} style={styles.button}>
            <Text>vao room</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={roomId}
          onChangeText={text => setRoomId(text)}
          style={{
            width: '100%',
            height: 80,
            backgroundColor: '#e4e4e4',
          }}
          placeholder="room ID"
        />
        <View
          style={{
            width: 100,
          }}>
          <Icon.Button name="facebook" backgroundColor="#3b5998">
            Facebook
          </Icon.Button>
        </View>

        <Icon name="ios-person" size={30} color="#4F8EF7" />
      </View>
    );
  }
  //hiện thị cuộc gọi
}
const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 60,
    backgroundColor: '#e2e2e2',
    margin: 5,
  },
});
