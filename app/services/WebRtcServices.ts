import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const configuration = {
  iceServers: [
    {urls: ['stun:171.244.133.171:3478']},
    {
      username: 'xcomp',
      credential: 'xcomp',
      urls: ['turn:171.244.133.171:3478'],
    },
  ],
};
// const configuration = {iceServers: [{url: 'stun:171.244.133.171:3478'}]};
export class WebRtcServices {
  static instead?: WebRtcServices;
  #localStream?: MediaStream;
  #RemoteStream?: MediaStream;
  #pc: RTCPeerConnection;
  #configuration: any;
  #roomId: string;
  #cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;

  constructor(input: {roomId: string}) {
    this.#roomId = input.roomId;
    this.#configuration = configuration;
    this.#pc = new RTCPeerConnection(this.#configuration);
    this.#cRef = firebase
      .firestore()
      .collection('meet')
      .doc(`chatID_${this.#roomId}`);

    WebRtcServices.instead = this;
  }

  #setupWebRtc = async () => {
    if (WebRtcServices.instead) {
      // lấy luồng stream âm thanh và video
      const stream = await WebRtcServices.instead.#getStream({isFront: false});
      if (stream) {
        // setLocalStream(stream);
        WebRtcServices.instead.#localStream = stream;
        WebRtcServices.instead.#pc.addStream(stream);
      }
      WebRtcServices.instead.#pc.onaddstream = e => {
        const _e = e as any;
        const _stream = _e.stream as MediaStream;
        console.log('onaddstream _stream', _stream.toURL());

        if (_stream) {
          // setRemoteStream(_stream);
          if (WebRtcServices.instead) {
            WebRtcServices.instead.#RemoteStream = _stream;
          }
        }
      };
    }
  };
  getLocalStream = (): MediaStream | undefined => {
    return WebRtcServices.instead
      ? WebRtcServices.instead.#localStream
      : undefined;
  };
  getRemoteStream = (): MediaStream | undefined => {
    return WebRtcServices.instead
      ? WebRtcServices.instead.#RemoteStream
      : undefined;
  };
  create = async () => {
    if (WebRtcServices.instead) {
      console.log('gọi ....');
      await WebRtcServices.instead.#setupWebRtc();
      await WebRtcServices.instead.#collectIceCandidates(
        WebRtcServices.instead.#cRef,
        'caller',
        'callee',
      );
      if (WebRtcServices.instead.#pc) {
        // create the offer for the call
        const offer = (await WebRtcServices.instead.#pc.createOffer(
          {},
        )) as RTCSessionDescription;
        WebRtcServices.instead.#pc.setLocalDescription(offer);

        const cWithOffer = {
          offer: {
            type: offer.type,
            sdp: offer.sdp,
          },
        };

        WebRtcServices.instead.#cRef.set(cWithOffer);
      }
    }
  };
  hangup = async () => {
    if (WebRtcServices.instead) {
      WebRtcServices.instead.#pc.close();

      await WebRtcServices.instead.#firestoreCleanUp();
      if (WebRtcServices.instead.#localStream) {
        WebRtcServices.instead.#localStream.getTracks().forEach(t => t.stop);
        WebRtcServices.instead.#localStream.release();
      }

      WebRtcServices.instead.#localStream = undefined;
      WebRtcServices.instead.#RemoteStream = undefined;

      if (WebRtcServices.instead.#hangupSuccess) {
        WebRtcServices.instead.#hangupSuccess();
      }
      WebRtcServices.instead = undefined;
    }
  };
  #hangupSuccess?: () => void;
  setHangupSuccess = (input?: {navigate: () => void}) => {
    if (WebRtcServices.instead) {
      WebRtcServices.instead.#hangupSuccess = input?.navigate;
    }
  };
  join = async (input: {success: () => void; failer: () => void}) => {
    if (WebRtcServices.instead) {
      console.log('join zoom ....');
      const offer = (await WebRtcServices.instead.#cRef.get()).data()?.offer;
      console.log('doc', `chatID_${WebRtcServices.instead.#roomId}`);

      if (offer) {
        await WebRtcServices.instead.#setupWebRtc();

        WebRtcServices.instead.#collectIceCandidates(
          WebRtcServices.instead.#cRef,
          'callee',
          'caller',
        );
        if (WebRtcServices.instead.#pc) {
          WebRtcServices.instead.#pc.setRemoteDescription(
            new RTCSessionDescription(offer),
          );

          // create answer for the call
          // update document with answer
          const answer =
            (await WebRtcServices.instead.#pc.createAnswer()) as RTCSessionDescription;
          WebRtcServices.instead.#pc.setLocalDescription(answer);
          const cWithAnswer = {
            answer: {
              type: answer.type,
              sdp: answer.sdp,
            },
          };
          WebRtcServices.instead.#cRef.update(cWithAnswer);
          input.success();
        }
      } else {
        console.log('đầu dây không tồn tại');
        input.failer();
        WebRtcServices.instead.hangup();
      }
    }
  };
  setConfiguration(_configuration: any) {
    if (WebRtcServices.instead) {
      WebRtcServices.instead.#configuration = _configuration;
      WebRtcServices.instead.#pc = new RTCPeerConnection(
        WebRtcServices.instead.#configuration,
      );
    }
  }
  setSpeaker = (isSpeaker: boolean) => {
    if (WebRtcServices.instead) {
      WebRtcServices.instead.#pc
        .getLocalStreams()[0]
        .getAudioTracks()[0].enabled = isSpeaker;
    }
  };
  setVideo = (isvideo: boolean) => {
    if (WebRtcServices.instead) {
      WebRtcServices.instead.#pc
        .getLocalStreams()[0]
        .getVideoTracks()[0].enabled = isvideo;
    }
  };
  #collectIceCandidates = async (
    mReft: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string,
  ) => {
    if (WebRtcServices.instead) {
      const candidateCollection = mReft.collection(localName);
      if (WebRtcServices.instead.#pc) {
        // lắng nghe sự kiện có stream vào connection

        // khi có sự kiện icecandidate
        // thêm môt ice candidate vào firestore

        WebRtcServices.instead.#pc.onicecandidate = event => {
          const _event = event as any;
          console.log('on icecandidate ', _event.candidate);
          if (_event.candidate) {
            candidateCollection.add(_event.candidate);
          }
        };
        mReft.onSnapshot(snapShot => {
          const data = snapShot.data();
          const answer = data?.answer;
          if (WebRtcServices.instead) {
            if (
              WebRtcServices.instead.#pc &&
              !WebRtcServices.instead.#pc.remoteDescription &&
              data &&
              answer
            ) {
              WebRtcServices.instead.#pc.setRemoteDescription(
                new RTCSessionDescription(answer),
              );
            }
          }
        });
        // get candidate to signal
        mReft.collection(remoteName).onSnapshot(snapshot => {
          snapshot.docChanges().forEach((change: any) => {
            console.log('change.type :', change.type, 'remoteName', remoteName);
            if (WebRtcServices.instead) {
              if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                WebRtcServices.instead.#pc.addIceCandidate(candidate);
              }
              if (change.type === 'removed') {
                WebRtcServices.instead.hangup();
              }
            }
          });
        });
      }
    }
  };
  #firestoreCleanUp = async () => {
    if (WebRtcServices.instead) {
      const calleeCandidate = await WebRtcServices.instead.#cRef
        .collection('callee')
        .get();
      calleeCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });
      const callerCandidate = await WebRtcServices.instead.#cRef
        .collection('caller')
        .get();
      callerCandidate.forEach(async candidate => {
        await candidate.ref.delete();
      });
      WebRtcServices.instead.#cRef.delete();
    }
  };
  #getStream = async (input: {
    isFront: boolean;
  }): Promise<MediaStream | undefined> => {
    const _sourceInfos = await mediaDevices.enumerateDevices();
    const sourceInfos = _sourceInfos as Array<any>;
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind === 'videoinput' &&
        sourceInfo.facing === (input.isFront ? 'front' : 'back')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: input.isFront ? 'user' : 'environment',
        deviceId: videoSourceId,
      },
    });
    if (typeof stream !== 'boolean') {
      return stream as MediaStream;
    }
    return undefined;
  };
}
