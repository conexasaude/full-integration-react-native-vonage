import React, { useCallback, FunctionComponent } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { LogoImg } from '@root/variables';
import { SvgImage } from '@root/components/SvgImage';

const Splash: FunctionComponent<any> = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      navigation.navigate('SDK');
    }, [navigation])
  );

  return (
    <SafeAreaView style={styles.container}>
      <SvgImage svg={<LogoImg style={styles.image} />} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 219,
    height: 44,
    resizeMode: 'contain',
  },
});

export default Splash;
