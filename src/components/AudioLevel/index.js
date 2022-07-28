import React, { useContext } from 'react';
import { View } from 'react-native';

import variables from '@root/variables';
import styles from './styles';
import { ThemeContext } from '@root/theme';

export default function AudioLevel(props) {
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;
  return (
    <View
      style={[
        styles.container,
        {
          transform: [
            { rotate: props.rotation === 'landscape' ? '90deg' : '0deg' },
          ],
        },
      ]}
    >
      <View
        style={{
          backgroundColor: colors.primary[500],
          width: 5,
          borderRadius: 10,
          margin: 2,
          height: props.audioOn ? props.audioLevel + 5 : 5,
        }}
      />
      <View
        style={{
          backgroundColor: colors.primary[500],
          width: 5,
          borderRadius: 10,
          margin: 2,
          height: props.audioOn
            ? props.audioLevel === 0
              ? 5
              : props.audioLevel + 8
            : 5,
        }}
      />
      <View
        style={{
          backgroundColor: colors.primary[500],
          width: 5,
          borderRadius: 10,
          margin: 2,
          height: props.audioOn ? props.audioLevel + 5 : 5,
        }}
      />
    </View>
  );
}
