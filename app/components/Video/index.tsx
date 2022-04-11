import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {MediaStream, RTCView} from 'react-native-webrtc';

type Props = {
  hangup?: () => void;
  remoteStream?: MediaStream;
  localStream?: MediaStream;
};
export default function Video(props: Props) {
  console.log('localStream', props.localStream?.toURL());
  console.log('remoteStream', props.remoteStream?.toURL());

  const Viewlocal = () => (
    <View>
      <Text> cuộc gọi chưa có người nghe</Text>
      <RTCView
        key={'local'}
        streamURL={props.localStream ? props.localStream.toURL() : ''}
        style={styles.video}
      />
      <TouchableOpacity onPress={props.hangup}>
        <Text>Tắt</Text>
      </TouchableOpacity>
    </View>
  );
  const ViewRemote = () => (
    <View>
      <Text> cuộc gọi có người nghe</Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <RTCView
          key={'local'}
          streamURL={props.localStream ? props.localStream.toURL() : ''}
          style={styles.video}
        />
        <RTCView
          key={'remote'}
          streamURL={props.remoteStream ? props.remoteStream.toURL() : ''}
          style={styles.video}
        />
      </View>
      <TouchableOpacity
        onPress={props.hangup}
        style={{width: 120, height: 60, backgroundColor: '#e2e2e2', margin: 3}}>
        <Text>Tắt</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      {props.localStream && props.remoteStream ? <ViewRemote /> : <Viewlocal />}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    height: 200,
    width: 150,
    backgroundColor: 'blue',
  },
});
