import {View} from '../../components/Themed';
import {Alert, StyleSheet} from 'react-native';
import Notifications from '../../components/Notification';
import React from 'react';
import {RootTabScreenProps} from '../../navigation/types';
import {WebRtcServices} from '../../services/WebRtcServices';
import IncallManager from 'react-native-incall-manager';
export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  const WebRtc = React.useCallback(
    async (roomId: string) => {
      console.log('open WebRtc');

      const _webRtcService = new WebRtcServices({
        roomId,
      });
      await _webRtcService.join({
        success: () => {
          navigation.navigate('CallWebRtc');
        },
        failer: () => {
          Alert.alert('cuộc gọi đã kết thúc');
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
    marginTop: 15,

    width: '100%',
    height: '100%',
  },
});
