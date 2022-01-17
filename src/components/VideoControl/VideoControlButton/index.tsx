import variables from '@root/variables';
import React, { FunctionComponent, cloneElement } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ButtonIconProps } from './types';

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({
  icon,
  isOn,
  style,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      ...style,
      elevation: 3,
      flexDirection: 'row',
      borderStyle: 'solid',
      borderRadius: 8,
      backgroundColor: isOn ? variables.neutral600 : variables.defaultWhite,
      marginRight: 20,
      width: 40,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    }}
  >
    <Icon
      name={icon}
      size={20}
      color={isOn ? variables.defaultWhite : variables.neutral600}
    />
  </TouchableOpacity>
);
export default ButtonIcon;
