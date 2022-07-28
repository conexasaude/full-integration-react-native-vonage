import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Wifi from '@assets/icons/icon_wifi.svg';
import { useNetInfo } from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Feather';

import variables from '@root/variables';

const NetworkQuality = () => {
  const netInfo = useNetInfo();
  const [backgroundColor, setBackgroundCollor] = useState(true);
  const [image, setImage] = useState(true);

  useEffect(() => {
    if (netInfo.isConnected) {
      setBackgroundCollor(variables.success100);
      setImage(<Wifi width={20} height={20} />);
    } else {
      setBackgroundCollor(variables.danger100);
      setImage(<Icon name="wifi-off" size={18} />);
    }
  }, [netInfo]);

  return (
    <View style={[styles.containerComponent, { backgroundColor }]}>
      {image}
    </View>
  );
};

const styles = StyleSheet.create({
  containerComponent: {
    position: 'absolute',
    alignItems: 'center',
    width: 40,
    height: 20,
    marginHorizontal: 10,
    top: 90,
    right: 26,
    borderRadius: 20,
  },
});

export { NetworkQuality };
