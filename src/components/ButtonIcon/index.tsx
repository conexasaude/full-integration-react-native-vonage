import React, { FunctionComponent, cloneElement } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ButtonIconProps } from './types';

import variables from '@root/variables';

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({
  round,
  size,
  icon,
  color,
  clear,
  FAQ,
  backgroundColor,
  onPress,
  rotation,
  borderRadius,
  width,
  height,
  borderWidth,
  margin,
  marginRight,
  borderColor,
  marginBottom,
  hasImagesIcons,
  title,
  subtitle,
  image,
  Svg = undefined,
}) =>
  hasImagesIcons ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        borderStyle: 'solid',
        borderRadius: round ? 50 : borderRadius,
        backgroundColor: clear ? 'transparent' : backgroundColor || '#fff',
        borderColor: clear ? backgroundColor || '#fff' : borderColor,
        borderWidth: clear ? 2 : borderWidth,
        marginRight,
        width: width || 40,
        height: height || 40,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: margin || 10,
        marginBottom: marginBottom || 16,
        transform: [{ rotate: rotation === 'landscape' ? '90deg' : '0deg' }],
      }}
    >
      {Svg ? (
        cloneElement(Svg, {
          width: 37,
          height: 35,
          marginLeft: 16,
          marginRight: 16,
          alignSelf: 'center',
        })
      ) : (
        <Image
          source={image}
          style={{
            tintColor: FAQ ? variables.grayIcon : variables.neutral600,
            width: 37,
            height: 35,
            marginLeft: 16,
            marginRight: 16,
            alignSelf: 'center',
          }}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            alignSelf: 'flex-start',
            marginBottom: '5px',
            fontFamily: 'Nunito-Regular',
            fontSize: 16,
            lineHeight: 18,
            color: '#4A4D55',
            fontWeight: '400',
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              alignSelf: 'flex-start',
              fontFamily: 'Nunito-Regular',
              fontSize: 14,
              lineHeight: 16,
              color: '#707683',
              fontWeight: '400',
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      <Icon
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          marginRight: 7,
          // top: -10,
        }}
        name="chevron-right"
        size={28}
        color="#9A9FA9"
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderStyle: 'solid',
        borderRadius: round ? 50 : borderRadius,
        backgroundColor: clear ? 'transparent' : backgroundColor || '#fff',
        borderColor: clear ? backgroundColor || '#fff' : borderColor,
        borderWidth: clear ? 2 : borderWidth,
        marginRight,
        width: width || 40,
        height: height || 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: margin || 10,
        marginBottom: marginBottom || 16,
        paddingHorizontal: 5,
        flexDirection: 'row',
        transform: [{ rotate: rotation === 'landscape' ? '90deg' : '0deg' }],
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontSize: 16,
            lineHeight: 22,
            color: variables.neutral900,
            fontWeight: '400',
          }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={{
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              // top: 24,
              // marginLeft: 10,
              fontFamily: 'Nunito-Regular',
              fontSize: '14px',
              lineHeight: 24,
              color: variables.neutral500,
              fontWeight: '400',
            }}
          >
            {subtitle}
          </Text>
        ) : (
          <View />
        )}
      </View>
      <Icon
        name={icon || 'chevron-right'}
        size={size || 20}
        color={color || 'gray'}
      />
    </TouchableOpacity>
  );
export default ButtonIcon;
