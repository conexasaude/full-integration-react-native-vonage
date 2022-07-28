import React from 'react';
import { Dimensions, Platform, SafeAreaView } from 'react-native';
import styles from './styles';
import VideoControlButton from './VideoControlButton';
import ButtonIcon from '../ButtonIcon';
import variables from '../../variables';
import AudioLevel from '@components/AudioLevel';

import CloseCallIcon from '../../assets/icons/closeCallIcon.svg';
import CameraIconOff from '../../assets/icons/cameraIconOff.svg';
import MicrofoneIconOff from '../../assets/icons/microfoneIconOff.svg';
import CameraIcon from '../../assets/icons/cameraIcon.svg';
import MicrofoneIcon from '../../assets/icons/microfoneIcon.svg';
import ChangeCameraIcon from '../../assets/icons/changeCameraIcon.svg';
import MessageIcon from '../../assets/icons/messageIcon.svg';
import ChatIcon from '../../assets/icons/icon_chat.svg';

// import ButtonAttachmentAttendance from '../ButtonAttachmentAttendance';

const { width, height } = Dimensions.get('window');

export default function VideoControl(props) {
  const [video, setVideo] = React.useState(props.video);
  const [audio, setAudio] = React.useState(props.audio);

  React.useEffect(() => {
    setAudio(props.audio);
    setVideo(props.video);
  }, [props.audio, props.video]);

  return (
    <SafeAreaView
      style={[
        styles.footer,

        props.phoneOrientation === 'landscape'
          ? { top: 0, left: 0, width: 60, height, flexDirection: 'column' }
          : {
              bottom: 0,
              left: 0,
              width,
              height: Platform.OS === 'android' ? 60 : 80,
              paddingBottom: Platform.OS === 'android' ? 0 : 10,
              flexDirection: 'row',
            },
      ]}
    >
      <VideoControlButton
        color={audio ? variables.neutral600 : 'white'}
        icon={audio ? 'mic' : 'mic-off'}
        isOn={audio}
        onPress={props.toggleAudio}
      />
      <VideoControlButton
        color={video ? variables.neutral600 : 'white'}
        icon={video ? 'videocam' : 'videocam-off'}
        isOn={video}
        onPress={props.toggleVideo}
      />
      <VideoControlButton
        color={variables.neutral600}
        icon="switch-video"
        isOn
        onPress={props.toggleCamera}
      />
      <VideoControlButton
        color={variables.neutral600}
        icon="close"
        isOn
        onPress={() => props.navigation.replace('SDK')}
      />
    </SafeAreaView>
  );
}
