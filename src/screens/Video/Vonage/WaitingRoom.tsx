import React from 'react';
import { View, Text } from 'react-native';
import { OTPublisher } from 'opentok-react-native';

import { Button } from '@components/Button';

import styles from './styles';

export default function WaitingRoom({
  streams,
  properties,
  publisherEventHandlers,
  goToRoom,
  publisherInit,
}) {
  return (
    <View style={styles.container}>
      {!publisherInit && (
        <View style={styles.videoContainer}>
          <View style={styles.video}>
            <Text style={styles.loadingMessage}>Carregando...</Text>
          </View>
        </View>
      )}

      <View
        style={[
          !publisherInit
            ? { opacity: 0, width: 0, height: 0 }
            : styles.videoContainer,
        ]}
      >
        <OTPublisher
          properties={properties}
          style={{ width: '100%', height: 350, fitMode: 'contain' }}
          eventHandlers={publisherEventHandlers}
        />
      </View>
      {streams.length === 0 && (
        <Text style={styles.message}>Só você está nessa sala</Text>
      )}
      {streams.length > 0 && streams.length < 2 && (
        <Text style={styles.message}>{streams[0].name} está nessa sala</Text>
      )}
      {streams.length > 1 && (
        <Text style={styles.message}>
          {streams[0].name} e mais {streams.length - 1} estão nessa sala
        </Text>
      )}

      <Button title="Participar" onPress={() => goToRoom()} />
    </View>
  );
}
