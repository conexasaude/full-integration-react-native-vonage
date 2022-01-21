import React, { useState, useEffect } from 'react';
import { OTSession, OT } from 'opentok-react-native';
import { View, LogBox, Platform, SafeAreaView } from 'react-native';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import VideoControl from '../../../components/VideoControl';

import Room from './Room';
import { apiVonageURL, apiKeyVonage } from '../../../services/api';

import OverlayLoader from '../../../components/OverlayLoader';
import styles from './styles';

LogBox.ignoreAllLogs();

export default function Vonage({ route, navigation }) {
  useKeepAwake();
  const [showChat, setShowChat] = useState(false);
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const [sessionId, setSessionId] = useState();
  const [token, setToken] = useState();
  const [cameraPosition, setCameraPosition] = useState('front');
  const [streams, setStreams] = useState([]);
  const [start, setStart] = useState(true);
  const [phoneOrientation, setPhoneOrientation] = useState('portrait');
  const [errorPermission, setErrorPermission] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);
  const [newMessagesAmount, setNewMessagesAmount] = useState(0);

  let credentialsTimeout = null;

  let userName = 'Paciente';

  let movingAvg = null;

  useEffect(() => {
    if (micPermission && cameraPermission) {
      credentialsTimeout = setTimeout(() => {
        setToken(route.params.tokenParticipante);
        setSessionId(route.params.id_chamada);
        // getCredentials();
      }, 3000);
    }
    return () => clearTimeout(credentialsTimeout);
  }, [micPermission, cameraPermission]);

  const publisherEventHandlers = {
    streamCreated: () => {},
    streamDestroyed: () => {},
    audioLevel: (event) => {
      if (movingAvg === null || movingAvg <= event) {
        movingAvg = event;
      } else {
        movingAvg = 0.7 * movingAvg + 0.3 * event;
      }

      // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
      let logLevel = Math.log(movingAvg) / Math.LN10 / 1.5 + 1;
      logLevel = Math.min(Math.max(logLevel, 0), 1);
      setAudioLevel(logLevel * 10);
    },
    error: () => {},
  };

  let sessionAux = [];

  const sessionEventHandlers = {
    streamCreated: (event) => {
      let arrStreams = sessionAux;

      let hasStream = streams.filter(
        (item) => item.streamId === event.streamId
      );

      if (hasStream) {
        arrStreams.push({
          streamId: event.streamId,
          name: event.name,
          height: event.height,
          width: event.width,
          hasAudio: event.hasAudio,
          hasVideo: event.hasVideo,
        });
      }

      sessionAux = arrStreams;

      updateStream(arrStreams);
    },
    streamPropertyChanged: (event) => {
      sessionAux = sessionAux.map((item) =>
        item.streamId === event?.stream?.streamId
          ? { ...item, [event.changedProperty]: event.newValue }
          : item
      );

      updateStream(sessionAux);
    },
    // mediaStopped: (event) => {
    //   console.log('|||||event: ', event);
    // },
    streamDestroyed: (event) => {
      const arr = sessionAux.filter((item) => item.streamId !== event.streamId);

      sessionAux = arr;

      updateStream(arr);

      checkCall();
    },
    error: () => {},
  };

  const updateStream = (data) => {
    setStreams([...data]);
  };

  // eslint-disable-next-line no-underscore-dangle
  const _onConnect = async () => {
    if (Platform.OS === 'android') {
      checkPermissionVideo(PERMISSIONS.ANDROID.CAMERA);
      checkPermissionVideo(PERMISSIONS.ANDROID.RECORD_AUDIO);
    } else if (Platform.OS === 'ios') {
      checkPermissionVideo(PERMISSIONS.IOS.CAMERA);
      checkPermissionVideo(PERMISSIONS.IOS.MICROPHONE);
    }
  };

  const checkPermissionVideo = (platform) => {
    check(platform)
      .then((result) => {
        // eslint-disable-next-line default-case
        switch (result) {
          case RESULTS.UNAVAILABLE:
            setErrorPermission(true);
            break;
          case RESULTS.DENIED:
            request(platform).then(() => {
              checkPermissionVideo(platform);
            });
            break;
          case RESULTS.LIMITED:
            setErrorPermission(true);
            break;
          case RESULTS.GRANTED:
            setErrorPermission(false);
            if (
              platform === PERMISSIONS.IOS.CAMERA ||
              platform === PERMISSIONS.ANDROID.CAMERA
            ) {
              setCameraPermission(true);
            }

            if (
              platform === PERMISSIONS.IOS.MICROPHONE ||
              platform === PERMISSIONS.ANDROID.RECORD_AUDIO
            ) {
              setMicPermission(true);
            }

            break;
          case RESULTS.BLOCKED:
            setErrorPermission(true);
            break;
        }
      })
      .catch((error) => {
        // …
      });
  };

  /* Iniciando o component */
  useFocusEffect(
    React.useCallback(() => {
      _onConnect();
    }, [])
  );

  const toggleAudio = () => {
    setAudio(!audio);
  };

  const toggleVideo = () => {
    setVideo(!video);
  };

  const toggleCamera = () => {
    if (cameraPosition === 'back') {
      setCameraPosition('front');
    } else {
      setCameraPosition('back');
    }
  };

  const endCall = () => {
    if (sessionId) {
      OT.disconnectSession(sessionId, () => {
        console.log('call ended');
      });
    } else {
      console.log('call ended');
    }
  };

  const checkCall = () => {
    axios
      .get(`${apiVonageURL}/status/${route.params.id_chamada}`)
      .then((result) => {
        if (result.data) {
          endCall();
        }
      });
  };

  const rotatePhone = () => {
    if (phoneOrientation === 'landscape') {
      setPhoneOrientation('portrait');
    } else {
      setPhoneOrientation('landscape');
    }
  };

  const goToSettings = () => {
    openSettings();
  };

  useEffect(() => {
    if (!errorPermission) {
      _onConnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPermission]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {(sessionId === undefined || token === undefined) && (
        <OverlayLoader loading={!sessionId && !token} style={styles.loader} />
      )}

      <View style={{ flex: 1 }}>
        {sessionId && token && (
          <OTSession
            style={{ flex: 1 }}
            apiKey={apiKeyVonage}
            sessionId={sessionId}
            token={token}
            eventHandlers={sessionEventHandlers}
            options={
              Platform.OS === 'android'
                ? {
                    androidOnTop: 'publisher',
                    useTextureViews: true,
                    androidZOrder: 'onTop',
                  }
                : {}
            }
          >
            {true && (
              <Room
                audio={audio}
                video={video}
                streams={streams}
                properties={{
                  facingMode:
                    cameraPosition === 'back' ? 'environment' : 'user',
                  cameraPosition,
                  publishAudio: audio,
                  publishVideo: video,
                  name: userName,
                }}
                publisherEventHandlers={publisherEventHandlers}
                phoneOrientation={phoneOrientation}
              />
            )}
          </OTSession>
        )}

        <VideoControl
          audio={audio}
          video={video}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          toggleCamera={toggleCamera}
          cameraPosition={cameraPosition}
          audioLevel={audioLevel}
          endCall={start ? () => endCall() : null}
          newMessagesAmount={newMessagesAmount}
          setNewMessagesAmount={() => setNewMessagesAmount(0)}
          vonage
          rotatePhone={rotatePhone}
          phoneOrientation={phoneOrientation}
          showChat={false}
          idAtendimento={route.params?.idAtendimento}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
}
