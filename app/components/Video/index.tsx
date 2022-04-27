import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {RTCView} from 'react-native-webrtc';
import Button from '../items/Button';
import {View} from '../Themed';
import {RootStackScreenProps} from '../../navigation/types';
import IncallManager from 'react-native-incall-manager';
import {WebRtcServices} from '../../services/WebRtcServices';
// import {Dimensions} from 'react-native';
// type Props = {
//   hangup: () => void;
//   remoteStream?: MediaStream;
//   localStream: MediaStream;
// };
type ButtonContainerProps = {
  isVideo: boolean;
  volume: boolean;
  mic: boolean;

  volumeClick: () => void;
  micClick: () => void;
  videoClick: () => void;
  hangup: () => void;
};
function ButtonContainer(props: ButtonContainerProps) {
  const {volumeClick, micClick, videoClick, hangup, isVideo, volume, mic} =
    props;

  // const [volume, setVolume] = useState(props.volume);

  // const [mic, setMic] = useState(props.mic);
  // const [isVideo, setIsVideo] = useState(props.isVideo);
  console.log(`ButtonContainer isVideo:${isVideo} volume:${volume} mic:${mic}`);

  return (
    <View style={styles.bContainer}>
      <Button
        iconName="call"
        BackgroundColor="red"
        onPress={() => {
          hangup();
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{marginHorizontal: 10}}
      />
      <Button
        iconName={isVideo ? 'videocam' : 'videocam-off'}
        BackgroundColor="#3e3e3e"
        onPress={() => {
          videoClick();
          // setIsVideo(old => !old);
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{marginHorizontal: 10}}
      />
      <Button
        iconName={volume ? 'volume-up' : 'volume-mute'}
        BackgroundColor="#3e3e3e"
        onPress={() => {
          volumeClick();
          // setVolume(old => !old);
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{marginHorizontal: 10}}
      />
      <Button
        iconName={mic ? 'mic-none' : 'mic-off'}
        BackgroundColor="#3e3e3e"
        onPress={() => {
          micClick();
          // setMic(old => !old);
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{marginHorizontal: 10}}
      />
    </View>
  );
}
export default function Video({
  navigation,
}: RootStackScreenProps<'CallWebRtc'>) {
  const localStream = WebRtcServices.instead?.getLocalStream();
  const remoteStream = WebRtcServices.instead?.getRemoteStream();
  const [volume, setVolume] = useState(false);
  const [mic, setMic] = useState(false);
  const [isVideo, setIsVideo] = useState(true);
  const [reload, setReaload] = useState(false);

  const volumeClick = useCallback(() => {
    let _vo = !volume;
    IncallManager.setSpeakerphoneOn(_vo);
    IncallManager.setForceSpeakerphoneOn(_vo);

    setVolume(_vo);
  }, [volume]);
  console.log(`Video isVideo:${isVideo} volume:${volume} mic:${mic}`);

  const micClick = useCallback(() => {
    const _vo = !mic;

    if (localStream) {
      localStream.getAudioTracks()[0].enabled = _vo;
    }
    setMic(_vo);
  }, [localStream, mic]);

  const videoClick = useCallback(() => {
    let _vo = !isVideo;

    // if (WebRtcServices.instead) {
    //   WebRtcServices.instead.setVideo(_vo);
    // }
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = _vo;
    }
    setIsVideo(_vo);
  }, [isVideo, localStream]);
  console.log('localStream', localStream?.toURL());
  console.log('remoteStream', remoteStream?.toURL());
  useEffect(() => {
    if (WebRtcServices.instead) {
      WebRtcServices.instead.updateRemoteStream = () => setReaload(old => !old);
      WebRtcServices.instead.setHangupSuccess({
        navigate: () => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        },
      });
    }
  }, [navigation]);
  // }, [props.remoteStream]);
  const hangup = useCallback(async () => {
    if (WebRtcServices.instead) {
      await WebRtcServices.instead?.hangup();
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  }, [navigation]);

  if (localStream && remoteStream) {
    return (
      <View style={styles.container}>
        {remoteStream.getVideoTracks()[0].enabled === true && (
          <RTCView
            streamURL={remoteStream.toURL()}
            objectFit={'cover'}
            style={styles.video}
            zOrder={10}
          />
        )}
        {isVideo && (
          <TouchableOpacity
            onPress={() => {
              localStream.getVideoTracks()[0]._switchCamera();
            }}
            style={styles.videoLocal}>
            <RTCView
              streamURL={localStream.toURL()}
              objectFit={'cover'}
              style={styles.videoLocal}
            />
          </TouchableOpacity>
        )}
        <ButtonContainer
          hangup={hangup}
          isVideo={isVideo}
          mic={mic}
          volume={volume}
          micClick={micClick}
          videoClick={videoClick}
          volumeClick={volumeClick}
        />
      </View>
    );
  } else if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        {reload && <View />}
        <RTCView
          streamURL={localStream.toURL()}
          objectFit={'cover'}
          style={styles.video}
        />
        <ButtonContainer
          hangup={hangup}
          isVideo={isVideo}
          mic={mic}
          volume={volume}
          micClick={micClick}
          videoClick={videoClick}
          volumeClick={volumeClick}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ButtonContainer
          hangup={hangup}
          isVideo={isVideo}
          mic={mic}
          volume={volume}
          micClick={micClick}
          videoClick={videoClick}
          volumeClick={volumeClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bContainer: {flexDirection: 'row', bottom: 30},
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10,
  },
});
