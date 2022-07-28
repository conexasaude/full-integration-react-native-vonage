import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import styles from './styles';
import ButtonIcon from '../ButtonIcon';
import variables from '../../variables';
import AudioLevel from '../AudioLevel';

import CloseCallIcon from '../../assets/icons/closeCallIcon.svg';
import CameraIconOff from '../../assets/icons/cameraIconOff.svg';
import MicrofoneIconOff from '../../assets/icons/microfoneIconOff.svg';
import CameraIcon from '../../assets/icons/cameraIcon.svg';
import MicrofoneIcon from '../../assets/icons/microfoneIcon.svg';
import ChangeCameraIcon from '../../assets/icons/changeCameraIcon.svg';
import MessageIcon from '../../assets/icons/messageIcon.svg';

import ButtonAttachmentAttendance from '../ButtonAttachmentAttendance';

const { width, height } = Dimensions.get('window');

export default function VideoControl(props) {
  const [video, setVideo] = React.useState(props.video);
  const [audio, setAudio] = React.useState(props.audio);

  React.useEffect(() => {
    setAudio(props.audio);
    setVideo(props.video);
  }, [props.audio, props.video]);

  return (
    <View
      style={[
        { position: 'absolute', zIndex: 99999999999, paddingHorizontal: 5 },
        props.phoneOrientation === 'landscape'
          ? {
              top: 20,
              left: 0,
              width: 48,
              height,
              flexDirection: 'column',
              justifyContent: 'space-around',
            }
          : {
              bottom: 20,
              width,
              height: 48,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
      ]}
    >
      {/* {props.audioLevel != null && props.audioLevel !== undefined && (
        <AudioLevel
          audioOn={audio}
          audioLevel={props.audioLevel}
          rotation={
            props.phoneOrientation === 'landscape' ? 'landscape' : 'portrait'
          }
        />
      )} */}
      {/*
      Commented because of no back-end integration yet
      <ButtonIcon
        width={29}
        height={29}
        IconSVG={CloseCallIcon}
        backgroundColor="#f64040"
        onPress={() => {
          console.log('desliga chamada');
        }}
        rotation={
          props.phoneOrientation === 'landscape' ? 'landscape' : 'portrait'
        }
      /> */}
      <ButtonIcon
        width={29}
        height={29}
        IconSVG={video ? CameraIcon : CameraIconOff}
        backgroundColor={video ? '#5f646f' : '#fff'}
        onPress={props.toggleVideo}
        rotation={
          props.phoneOrientation === 'landscape' ? 'landscape' : 'portrait'
        }
      />
      <ButtonIcon
        width={26}
        height={26}
        IconSVG={ChangeCameraIcon}
        backgroundColor="#5f646f"
        onPress={props.toggleCamera}
        rotation={
          props.phoneOrientation === 'landscape' ? 'landscape' : 'portrait'
        }
      />
      <ButtonIcon
        width={26}
        height={26}
        IconSVG={audio ? MicrofoneIcon : MicrofoneIconOff}
        backgroundColor={audio ? '#5f646f' : '#fff'}
        onPress={props.toggleAudio}
        rotation={
          props.phoneOrientation === 'landscape' ? 'landscape' : 'portrait'
        }
      />
      {props.showChat ? (
        <View>
          {props.newMessagesAmount > 0 && (
            <Text style={styles.newMessagesAmount}>
              {props.newMessagesAmount}
            </Text>
          )}
          <ButtonIcon
            width={23}
            height={23}
            IconSVG={MessageIcon}
            backgroundColor="#5f646f"
            onPress={() => {
              props.setNewMessagesAmount();
              props.showChat(true);
            }}
            rotation={
              props.phoneOrientation === 'landscape' ? 'landscape' : 'portrait'
            }
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#5f646f',
            height: 48,
            width: 48,
            borderRadius: 8,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonAttachmentAttendance
            iconColor="#fff"
            iconWidth={20}
            idAtendimento={props.idAtendimento}
          />
        </View>
      )}
    </View>
  );
}
