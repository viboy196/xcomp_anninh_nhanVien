import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type Props = {
  hangup: () => void;

  join: () => void;
};
export default function GettingCall(props: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={props.join}
        style={{width: 120, height: 60, backgroundColor: '#e2e2e2', margin: 3}}>
        <Text> Nhận cuộc gọi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.hangup}
        style={{width: 120, height: 60, backgroundColor: '#e2e2e2', margin: 3}}>
        <Text>Tắt</Text>
      </TouchableOpacity>
    </View>
  );
}
