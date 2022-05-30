import {View} from '../../components/Themed';
import {StyleSheet} from 'react-native';
import Notifications from '../../components/Notification';
import React from 'react';
import {RootTabScreenProps} from '../../navigation/types';
import {WebRtcServices} from '../../services/WebRtcServices';
import IncallManager from 'react-native-incall-manager';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import uuid from 'react-native-uuid';
export type RoomState = {
  roomId: string;
  stateToken: string;
};
export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  const WebRtc = React.useCallback(
    async (item: RoomState) => {
      console.log('open WebRtc');

      const _webRtcService = new WebRtcServices({
        roomId: item.roomId,
      });
      await _webRtcService.join({
        success: () => {
          navigation.navigate('CallWebRtc');
        },
        failer: async () => {
          const roomIdNew = uuid.v4() as string;
          console.log('roomId', roomIdNew);

          const _wrtc = new WebRtcServices({
            roomId: roomIdNew,
          });

          _wrtc.create().then(() => {
            navigation.navigate('CallWebRtc');
            _wrtc.setSpeaker(false);
            firebase
              .database()
              .ref('user')
              .child(item.stateToken)
              .push({roomId: roomIdNew}, () => {
                console.log('send roomID success');
              });
          });
        },
      });
      _webRtcService.setSpeaker(false);
      IncallManager.setSpeakerphoneOn(false);
      IncallManager.setForceSpeakerphoneOn(false);
    },
    [navigation],
  );
  return (
    <View style={styles.container}>
      <Notifications WebRtc={WebRtc} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
