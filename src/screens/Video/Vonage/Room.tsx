import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import {
  OTPublisher,
  OTSubscriber,
  OTSubscriberView,
} from 'opentok-react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useStyles } from './styles';

const { width, height } = Dimensions.get('window');

export default function Room({
  properties,
  publisherEventHandlers,
  streams,
  phoneOrientation,
}) {
  const { RootStyles } = useStyles();
  const { buttonResize, container, mainVideo, secondaryVideo } = RootStyles;

  const [videoFocus, setVideoFocus] = useState();
  const [mainVideoStyle, setMainVideoStyle] = useState({
    width: '100%',
    height: height - 60,
  });
  const [terciaryVideoStyle, setTerciaryVideoStyle] = useState({
    width: '100%',
    height: height / 2 - 60,
  });
  const [quartenaryVideoStyle, setQuartenaryVideoStyle] = useState({
    width: '100%',
    height: height / 3 - 40,
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
      setMainVideoStyle({ width: width - 60, height });
      setTerciaryVideoStyle({
        width: height / 2 - 60,
        height: width,
      });
    } else {
      setMainVideoStyle({ width: '100%', height: height - 60 });
      setTerciaryVideoStyle({
        width: '100%',
        height: height / 2 - 60,
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
          // {
          //   position: 'relative',
          //   backgroundColor: 'black',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   alignSelf: phoneOrientation === 'landscape' ? 'flex-end' : 'auto',
          // },
        ]}
        key={index.toString()}
      >
        {subscriber.streamId && (
          <ReactNativeZoomableView
            zoomEnabled={subscribers.length === 1 || videoFocus !== undefined}
            maxZoom={1.2}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders
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
                position: 'relative',
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf:
                  phoneOrientation === 'landscape' ? 'flex-end' : 'auto',
              },
            ]}
          >
            <OTSubscriberView
              streamId={subscriber.streamId}
              style={{
                width:
                  subscribers.length === 1
                    ? phoneOrientation === 'landscape'
                      ? height
                      : '100%'
                    : phoneOrientation === 'landscape'
                    ? width
                    : '100%',
                height:
                  subscribers.length === 1
                    ? phoneOrientation === 'landscape'
                      ? subscriber.height *
                        ((width * 100) / subscriber.height / 100)
                      : subscriber.height *
                        ((width * 100) / subscriber.width / 100)
                    : phoneOrientation === 'landscape'
                    ? subscriber.height *
                      ((width * 100) / subscriber.height / 100)
                    : subscriber.height *
                      ((width * 100) / subscriber.width / 100),
                fitMode: 'contain',
                transform: [
                  {
                    rotate: phoneOrientation === 'landscape' ? '90deg' : '0deg',
                  },
                ],
              }}
            />
          </ReactNativeZoomableView>
        )}

        {subscribers.length > 1 && (
          <TouchableOpacity
            style={[buttonResize, { bottom: videoFocus ? 90 : 30 }]}
            onPress={() =>
              setVideoFocus(videoFocus ? undefined : subscriber.streamId)
            }
          >
            <Icon
              style={{ alignSelf: 'center' }}
              name={videoFocus ? 'compress-arrows-alt' : 'expand-arrows-alt'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    ));

  return (
    <View style={container}>
      <View style={streamsState.length === 0 ? mainVideo : secondaryVideo}>
        <OTPublisher
          properties={properties}
          style={{
            display: properties.publishVideo ? 'flex' : 'none',
            width: '100%',
            height: '100%',
          }}
          eventHandlers={publisherEventHandlers}
        />
      </View>
      <View style={{ width, height }}>
        <OTSubscriber>{() => renderSubscribers(streamsState)}</OTSubscriber>
      </View>
    </View>
  );
}
