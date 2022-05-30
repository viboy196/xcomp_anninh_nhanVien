import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import {FirebaseDatabaseTypes} from '@react-native-firebase/database';

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

// const OFFER = 'offer';
// const ANSWER = 'answer';
// const configuration = {iceServers: [{url: 'stun:171.244.133.171:3478'}]};
export class WebRtcServices {
  static instead?: WebRtcServices;
  #localStream?: MediaStream;
  #RemoteStream?: MediaStream;
  #pc: RTCPeerConnection;
  #configuration: any;
  #roomId: string;
  #cRef: FirebaseDatabaseTypes.Reference;
  #countHangup?: number;
  updateRemoteStream?: () => void;
  constructor(input: {roomId: string}) {
    console.log('new object WebRtcServices');

    this.#roomId = input.roomId;
    this.#configuration = configuration;
    this.#pc = new RTCPeerConnection(this.#configuration);
    this.#cRef = firebase
      .database()
      .ref('meet')
      .child(`chatID_${this.#roomId}`);
    this.#countHangup = 1;
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
            if (WebRtcServices.instead.updateRemoteStream) {
              WebRtcServices.instead.updateRemoteStream();
            }
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
      console.log('roomId ... :', WebRtcServices.instead.#roomId);

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
          type: offer.type,
          sdp: offer.sdp,
        };

        WebRtcServices.instead.#cRef.child('offer').set(cWithOffer);
      }
    }
  };
  hangup = async () => {
    console.log('hangup');
    if (WebRtcServices.instead) {
      WebRtcServices.instead.#countHangup = 0;
      WebRtcServices.instead.#pc.close();

      await WebRtcServices.instead.#firestoreCleanUp();

      if (WebRtcServices.instead) {
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
      const offer = (
        await WebRtcServices.instead.#cRef.child('offer').once('value')
      ).val();
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
            type: answer.type,
            sdp: answer.sdp,
          };
          WebRtcServices.instead.#cRef.child('answer').set(cWithAnswer);
          input.success();
        }
      } else {
        console.log('đầu dây không tồn tại');
        WebRtcServices.instead.hangup().then(() => {
          input.failer();
        });
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
      try {
        WebRtcServices.instead.#pc
          .getLocalStreams()[0]
          .getAudioTracks()[0].enabled = isSpeaker;
      } catch (error) {
        console.log('LỖi set setSpeaker');
      }
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
    mReft: FirebaseDatabaseTypes.Reference,
    localName: string,
    remoteName: string,
  ) => {
    if (WebRtcServices.instead) {
      console.log('collectIceCandidates');

      const candidateCollection = mReft.child(localName);
      if (WebRtcServices.instead.#pc) {
        // lắng nghe sự kiện có stream vào connection

        // khi có sự kiện icecandidate
        // thêm môt ice candidate vào firestore

        WebRtcServices.instead.#pc.onicecandidate = event => {
          const _event = event as any;
          console.log('on icecandidate ', _event.candidate);
          if (_event.candidate) {
            candidateCollection.push(_event.candidate);
          }
        };
        mReft.child('answer').on('value', snapShot => {
          const answer = snapShot.val();
          if (WebRtcServices.instead) {
            if (
              WebRtcServices.instead.#pc &&
              !WebRtcServices.instead.#pc.remoteDescription &&
              answer
            ) {
              WebRtcServices.instead.#pc.setRemoteDescription(
                new RTCSessionDescription(answer),
              );
            }
          }
        });
        // get candidate to signal
        mReft.child(remoteName).on('child_added', snapshot => {
          const candidate = new RTCIceCandidate(snapshot.val());
          if (WebRtcServices.instead) {
            WebRtcServices.instead.#pc.addIceCandidate(candidate);
          }
        });
        WebRtcServices.instead.#cRef.on('child_removed', () => {
          if (WebRtcServices.instead) {
            if (WebRtcServices.instead.#countHangup === 1) {
              WebRtcServices.instead.hangup();
            }
          }
        });
      }
    }
  };
  #firestoreCleanUp = async () => {
    if (WebRtcServices.instead) {
      const calleeCandidate = await WebRtcServices.instead.#cRef.child(
        'callee',
      );
      calleeCandidate.remove();

      const callerCandidate = await WebRtcServices.instead.#cRef.child(
        'caller',
      );
      callerCandidate.remove();

      WebRtcServices.instead.#cRef.remove();
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
