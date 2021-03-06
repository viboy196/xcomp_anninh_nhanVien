// import React, {useRef, useState} from 'react';

// import {
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Alert,
// } from 'react-native';
// import {
//   MediaStream,
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
// } from 'react-native-webrtc';
// // import Video from './components/Video';
// import Utils from '../utils';
// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/firestore';
// import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
// // import Icon from 'react-native-vector-icons/Ionicons';

// import Video from '../components/Video';
// import {RootStackScreenProps} from '../navigation/types';

// // const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
// const configuration = {
//   iceServers: [
//     {urls: ['stun:hk-turn1.xirsys.com']},
//     {
//       username:
//         'x8w5WLKrzM-Syir6HnFKQFG6y1sobLQpOTkAIM3Lj8xbuPo3UeIQzAQN3Q0HW18AAAAAAGJTyEx2aWJveTE5Ng==',
//       credential: '420db210-b95f-11ec-b5af-0242ac120004',
//       urls: [
//         'turn:hk-turn1.xirsys.com:80?transport=udp',
//         'turn:hk-turn1.xirsys.com:3478?transport=udp',
//         'turn:hk-turn1.xirsys.com:80?transport=tcp',
//         'turn:hk-turn1.xirsys.com:3478?transport=tcp',
//         'turns:hk-turn1.xirsys.com:443?transport=tcp',
//         'turns:hk-turn1.xirsys.com:5349?transport=tcp',
//       ],
//     },
//   ],
// };

// export default function VideoTest({
//   route,
//   navigation,
// }: RootStackScreenProps<'CallWebRtc'>) {
//   const [localStream, setLocalStream] = useState<MediaStream>();
//   const [remoteStream, setRemoteStream] = useState<MediaStream>();

//   const [roomId, setRoomId] = useState<string>();
//   const [status, setStatus] = useState<string>(route.params.status);
//   console.log('roomId :', roomId);

//   const pc = useRef<RTCPeerConnection>();
//   const connecting = useRef(false);

//   const setupWebRtc = async () => {
//     pc.current = new RTCPeerConnection(configuration);
//     // l???y lu???ng stream ??m thanh v?? video
//     const stream = await Utils.getStream();
//     if (stream) {
//       setLocalStream(stream);
//       pc.current.addStream(stream);
//     }

//     pc.current.onaddstream = e => {
//       const _e = e as any;
//       const _stream = _e.stream as MediaStream;

//       if (_stream) {
//         setRemoteStream(_stream);
//       }
//     };
//     // get the remote stream once it is available
//   };

//   const join = async () => {
//     console.log('join zoom ....');
//     connecting.current = true;
//     const cRef = firebase
//       .firestore()
//       .collection('meet')
//       .doc(`chatID_${route.params.roomId}`);
//     const offer = (await cRef.get()).data()?.offer;
//     console.log('doc', `chatID_${route.params.roomId}`);

//     if (offer) {
//       await setupWebRtc();

//       collectIceCandidates(cRef, 'callee', 'caller');
//       if (pc.current) {
//         pc.current.setRemoteDescription(new RTCSessionDescription(offer));

//         // create answer for the call
//         // update document with answer
//         const answer =
//           (await pc.current.createAnswer()) as RTCSessionDescription;
//         pc.current.setLocalDescription(answer);
//         const cWithAnswer = {
//           answer: {
//             type: answer.type,
//             sdp: answer.sdp,
//           },
//         };
//         cRef.update(cWithAnswer);
//       }
//     } else {
//       Alert.alert('?????u d??y kh??ng t???n t???i');
//       hangup();
//     }
//   };

//   /**
//    * for disconnecting the call close the connection , release the stream
//    * And delete the document for the call
//    */
//   const hangup = async () => {
//     setStatus('');
//     connecting.current = false;

//     if (pc.current) {
//       pc.current.close();
//     }
//     await firestoreCleanUp();
//     await streamCleanUp();
//   };

//   const firestoreCleanUp = async () => {
//     const cRef = firebase
//       .firestore()
//       .collection('meet')
//       .doc(`chatID_${route.params.roomId}`);
//     const calleeCandidate = await cRef.collection('callee').get();
//     calleeCandidate.forEach(async candidate => {
//       await candidate.ref.delete();
//     });
//     const callerCandidate = await cRef.collection('caller').get();
//     callerCandidate.forEach(async candidate => {
//       await candidate.ref.delete();
//     });
//     cRef.delete();
//   };
//   // Helper function
//   const streamCleanUp = async () => {
//     if (localStream) {
//       localStream.getTracks().forEach(t => t.stop);
//       localStream.release();
//     }
//     setLocalStream(undefined);
//     setRemoteStream(undefined);
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     }
//   };

//   const collectIceCandidates = async (
//     mReft: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
//     localName: string,
//     remoteName: string,
//   ) => {
//     const candidateCollection = mReft.collection(localName);
//     if (pc.current) {
//       // l???ng nghe s??? ki???n c?? stream v??o connection

//       // khi c?? s??? ki???n icecandidate
//       // th??m m??t ice candidate v??o firestore

//       pc.current.onicecandidate = event => {
//         const _event = event as any;
//         if (_event.candidate) {
//           candidateCollection.add(_event.candidate);
//         }
//       };
//       // get candidate to signal
//       mReft.collection(remoteName).onSnapshot(snapshot => {
//         snapshot.docChanges().forEach((change: any) => {
//           if (change.type === 'added') {
//             const candidate = new RTCIceCandidate(change.doc.data());
//             pc.current?.addIceCandidate(candidate);
//           }
//           if (change.type === 'removed') {
//             hangup();
//           }
//         });
//       });
//     }
//   };

//   if (status === 'answer') {
//     setStatus('');
//     join();
//   }
//   console.log('status', status);

//   if (localStream) {
//     // hi???n th??? m??n h??nh call
//     return (
//       <Video
//         hangup={hangup}
//         localStream={localStream}
//         remoteStream={remoteStream}
//       />
//     );
//   } else {
//     // c??n l???i hi???n th??? n??t g???i
//     return (
//       <View>
//         <View style={{flexDirection: 'row'}}>
//           <TouchableOpacity onPress={join} style={styles.button}>
//             <Text>vao room</Text>
//           </TouchableOpacity>
//         </View>

//         <TextInput
//           value={roomId}
//           onChangeText={text => setRoomId(text)}
//           style={{
//             width: '100%',
//             height: 80,
//             backgroundColor: '#e4e4e4',
//           }}
//           placeholder="room ID"
//         />
//         <View
//           style={{
//             width: 100,
//           }}></View>
//       </View>
//     );
//   }
//   //hi???n th??? cu???c g???i
// }
// const styles = StyleSheet.create({
//   button: {
//     width: 120,
//     height: 60,
//     backgroundColor: '#e2e2e2',
//     margin: 5,
//   },
// });
