import {View} from '../../components/Themed';
import {StyleSheet} from 'react-native';
import Notifications from '../../components/Notification';
import React from 'react';
import {RootTabScreenProps} from '../../navigation/types';

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  const WebRtc = React.useCallback(
    (roomId: string) => {
      console.log('open WebRtc');

      navigation.navigate('CallWebRtc', {roomId});
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
