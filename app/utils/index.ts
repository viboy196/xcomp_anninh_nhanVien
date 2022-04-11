import {mediaDevices, MediaStream} from 'react-native-webrtc';
export default class Utils {
  static async getStream(): Promise<MediaStream | undefined> {
    let isFront = true;
    const _sourceInfos = await mediaDevices.enumerateDevices();
    const sourceInfos = _sourceInfos as Array<any>;
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind === 'videoinput' &&
        sourceInfo.facing === (isFront ? 'front' : 'back')
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
        facingMode: isFront ? 'user' : 'environment',
        deviceId: videoSourceId,
      },
    });
    if (typeof stream !== 'boolean') {
      return stream as MediaStream;
    }
    return undefined;
  }
}

// export class FirebaseRealTime {
//   static async add(
//     roomId: string,
//     localName: string,
//     data: {
//       key: string;
//       value: object;
//     },
//   ) {
//     const referent = database().ref(`rooms/${roomId}/${localName}/${data.key}`);
//     referent
//       .set(data.value)
//       .then(() => console.log(`add data ${data.key} success`));
//   }

//   static async update(roomId: string, localName: string, data: any) {
//     const ref =
//       localName !== '' ? `rooms/${roomId}/${localName}/` : `rooms/${roomId}/`;
//     const referent = database().ref(ref);
//     referent
//       .update(data)
//       .then(() => console.log(`update data ${localName} success`));
//   }
//   static async get(roomId: string, success: (data: Array<any>) => void) {
//     const referent = database().ref(`rooms/${roomId}`);
//     referent.once('value').then(snapshot => {
//       console.log('User data: ', snapshot.key, '|');
//       const datas = snapshot.val() as Array<any>;
//       success(datas);
//     });
//   }

//   static async onSnapshot_changed(
//     roomId: string,
//     success: (datas: Array<any>) => void,
//   ) {
//     const referent = database().ref(`rooms/${roomId}`);
//     referent.on('value', (snapshot, key) => {
//       console.log('key onSnapshot_changed', key);

//       console.log('onSnapshot_changed');
//       const datas = snapshot.val() as Array<any>;
//       if (datas !== null) {
//         var filtered = datas.filter(function (el) {
//           return el != null;
//         });
//         success(filtered);
//       }
//     });
//   }

//   static async onSnapshot_removed(roomId: string, success: () => void) {
//     const referent = database().ref(`rooms/${roomId}`);
//     referent.on('child_removed', _snapshot => {
//       success();
//     });
//   }

//   static async remove(roomId: string) {
//     database()
//       .ref(`rooms/${roomId}`)
//       .remove()
//       .then(() => {
//         console.log(`remove ${roomId} success`);
//       });
//   }
// }
