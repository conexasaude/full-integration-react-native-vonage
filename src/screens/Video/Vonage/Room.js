import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
import {
  OTPublisher,
  OTSubscriber,
  OTSubscriberView,
} from 'opentok-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { absoluteFill } from 'react-native-extended-stylesheet';

import MinimizeIcon from '../../../assets/icons/icon_minimize.svg';

import FullScreenIcon from '../../../assets/icons/icon_fullscreen.svg';

import ChatDefaultProfileIcon from '../../../assets/icons/chatDefaultProfileIcon.svg';
import MicrofoneIconOff from '../../../assets/icons/microfoneIconOff.svg';
import { NetworkQuality } from './NetworkQuality';
import MicrofoneIcon from '../../../assets/icons/microfoneIcon.svg';

import styles from './styles';
import variables from '../../../variables';

const { width, height } = Dimensions.get('window');

export default function Room({
  audio,
  video,
  properties,
  publisherEventHandlers,
  streams,
  phoneOrientation,
}) {
  const [h, setH] = useState(height);
  const [videoFocus, setVideoFocus] = useState();
  const [mainVideoStyle, setMainVideoStyle] = useState({
    width: '100%',
    height,
  });
  const [terciaryVideoStyle, setTerciaryVideoStyle] = useState({
    width: '100%',
    height: height / 2, //
  });
  const [quartenaryVideoStyle, setQuartenaryVideoStyle] = useState({
    width: '100%',
    height: height / 3, //
  });
  const [streamsState, setStreamsState] = useState([]);

  useEffect(() => {
    if (streams.length > 0) {
      let filteredStreams = streams.filter((item) => item.name !== '');
      setStreamsState(filteredStreams);
    } else {
      setStreamsState([]);
    }
    setVideoFocus();
  }, [streams]);

  useEffect(() => {
    if (phoneOrientation === 'landscape') {
      setMainVideoStyle({ width, height });
      setTerciaryVideoStyle({
        width: height,
        height: width,
      });
    } else {
      setMainVideoStyle({ width: '100%', height });
      setTerciaryVideoStyle({
        width: '100%',
        height,
      });
    }
  }, [phoneOrientation]);

  const renderSubscribers = (subscribers) =>
    subscribers.map((subscriber, index) => (
      <View
        style={[
          videoFocus
            ? videoFocus === subscriber.streamId
              ? mainVideoStyle
              : { display: 'none' }
            : subscribers.length === 1
            ? mainVideoStyle
            : subscribers.length === 3
            ? quartenaryVideoStyle
            : terciaryVideoStyle,
          {
            height: videoFocus
              ? videoFocus === subscriber.streamId
                ? height
                : 0
              : h / subscribers.length,
            width,
          },
          // {
          //   position: 'relative',
          //
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   alignSelf: phoneOrientation === 'landscape' ? 'flex-end' : 'auto',
          // },
        ]}
        key={index.toString()}
      >
        {subscriber.streamId && (
          <View
            // zoomEnabled={subscribers.length === 1 || videoFocus !== undefined}
            // maxZoom={1.0}
            // minZoom={1.0}
            // zoomStep={0.5}
            // initialZoom={1.0}
            // bindToBorders
            style={[
              // videoFocus
              //   ? videoFocus === subscriber.streamId
              //     ? mainVideoStyle
              //     : { display: 'none' }
              //   : subscribers.length === 1
              //   ? mainVideoStyle
              //   : subscribers.length === 3
              //   ? quartenaryVideoStyle
              //   : terciaryVideoStyle,
              {
                height: videoFocus
                  ? videoFocus === subscriber.streamId
                    ? height
                    : 0
                  : h / subscribers.length,
                width,
              },
              // {
              //   position: 'relative',
              //   backgroundColor: 'black',
              //   justifyContent: 'center',
              //   alignItems: 'center',
              //   alignSelf:
              //     phoneOrientation === 'landscape' ? 'flex-end' : 'auto',
              // },
            ]}
          >
            <View>
              <OTSubscriberView
                streamId={subscriber.streamId}
                style={{
                  width,
                  height: videoFocus
                    ? videoFocus === subscriber.streamId
                      ? height
                      : 0
                    : h / subscribers.length,
                  // height: height / subscribers.length,
                  // width: width / subscribers.length,
                  // subscribers.length === 1
                  //   ? phoneOrientation === 'landscape'
                  //     ? height
                  //     : '100%'
                  //   : phoneOrientation === 'landscape'
                  //   ? width
                  //   : '100%',
                  // subscribers.length === 1
                  //   ? phoneOrientation === 'landscape'
                  //     ? subscriber.height *
                  //       ((width * 100) / subscriber.height / 100)
                  //     : subscriber.height *
                  //       ((width * 100) / subscriber.width / 100)
                  //   : phoneOrientation === 'landscape'
                  //   ? subscriber.height *
                  //     ((width * 100) / subscriber.height / 100)
                  //   : subscriber.height *
                  //     ((width * 100) / subscriber.width / 100),
                  transform: [
                    {
                      rotate:
                        phoneOrientation === 'landscape' ? '90deg' : '0deg',
                    },
                  ],
                }}
              />
              {!subscriber.hasVideo && (
                <View
                  style={{
                    position: `absolute`,
                    zIndex: 999,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#000',
                  }}
                >
                  <View
                    style={{
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#2D2F34',
                      borderRadius: 80,
                      height: 160 / subscribers.length,
                      width: 160 / subscribers.length,
                    }}
                  >
                    <ChatDefaultProfileIcon
                      height={128 / subscribers.length}
                      width={128 / subscribers.length}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 8,
                      color: '#fff',
                      fontFamily: variables.nunitoBold,
                      fontSize: 20,
                    }}
                  >
                    {subscriber.name}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {subscribers.length > 1 && (
          <TouchableOpacity
            style={[styles.buttonResize]}
            onPress={() =>
              setVideoFocus(videoFocus ? undefined : subscriber.streamId)
            }
          >
            {videoFocus === subscriber.streamId ? (
              <MinimizeIcon height={24} width={24} />
            ) : (
              <FullScreenIcon height={24} width={24} />
            )}
          </TouchableOpacity>
        )}
      </View>
    ));

  return (
    <View
      onLayout={(event) => {
        setH(event.nativeEvent.layout.height);
      }}
      style={styles.container}
    >
      <View
        style={
          streamsState.length === 0 ? styles.mainVideo : styles.secondaryVideo
        }
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: 'transparent',
            elevation: 2,
            alignContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: streamsState.length > 0 ? 8 : 0,
          }}
        >
          {streamsState.length > 0 && (
            <View
              style={{
                zIndex: 9999,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: audio ? '#5f646f' : '#fff',
                borderRadius: 4,
                position: 'absolute',
                top: 4,
                right: 4,
                height: 22,
                width: 22,
              }}
            >
              {audio ? (
                <MicrofoneIcon height={14} width={14} />
              ) : (
                <MicrofoneIconOff height={14} width={14} />
              )}
            </View>
          )}

          <View
            style={{
              backgroundColor: '#000',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <OTPublisher
              properties={properties}
              style={{
                display: video ? 'flex' : 'none',
                width: '100%',
                height: '100%',
                alignContent: 'center',
                alignItems: 'center',
              }}
              eventHandlers={publisherEventHandlers}
            />

            {!video && (
              <View
                style={{
                  backgroundColor: '#2D2F34',
                  padding: 8,
                  bottom: 3,
                  borderRadius: 40,
                }}
              >
                <ChatDefaultProfileIcon height={40} width={40} />
              </View>
            )}

            <NetworkQuality />
          </View>
        </View>
      </View>
      <View style={{ width, height }}>
        <OTSubscriber style={{ width, height }}>
          {() => renderSubscribers(streamsState)}
        </OTSubscriber>
      </View>
    </View>
  );
}
