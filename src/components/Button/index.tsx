import React, { FunctionComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { css } from '@emotion/native';

import { Loader } from '@components/Loader';

import variables from '@root/variables';
import { ButtonProps, ButtonSize } from './types';
import styles from './styles';
import { Icon } from './Icon';

const Button: FunctionComponent<ButtonProps> = ({
  onPress,
  appoitmentDetailButton,
  title,
  icon,
  endIcon,
  busy,
  outline,
  disabled,
  size,
  fullWidth,
  width,
  height,
  style,
  textStyle,
  ...rest
}) => {


  function getButtonSize(sizeArg: string | undefined): ButtonSize {
    switch (sizeArg) {
      case 'sm':
        return {
          fontSize: '14px',
          padding: '8px 16px',
          paddinOutline: '7px 14.5px',
        };
      case 'md':
        return { fontSize: '16px', padding: '16px', paddinOutline: '14.5px ' };
      case 'lg':
        return { fontSize: '16px', padding: '24px', paddinOutline: '22.5px' };
      default:
        return { fontSize: '16px', padding: '16px', paddinOutline: '14.5px' };
    }
  }

  function numberToPixels(value: number) {
    return `${value}px`;
  }

  return (
    <View
      testID="hero-button"
      style={[
        styles.container,
        style,
        fullWidth &&
          css`
            width: 100%;
          `,
        width &&
          css`
            min-width: 100px;
            width: ${numberToPixels(width)};
          `,
        height
          ? css`
              height: ${numberToPixels(height)};
            `
          : false,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.button,
          width
            ? css`
                min-width: 100px;
                width: ${numberToPixels(width)};
              `
            : false,

          fullWidth &&
            css`
              width: 100%;
            `,

          css`
            padding: ${outline
              ? getButtonSize(size).paddinOutline
              : getButtonSize(size).padding};
          `,

          outline && !disabled
            ? {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: '#0031B2',
              }
            : {
                backgroundColor: '#0031B2',
              },
          disabled && styles.containerDisabled,
          outline && disabled && styles.containerOutlineDisabled,
          height
            ? css`
                height: ${numberToPixels(height)};
                padding: 8px;
              `
            : false,
        ]}
        disabled={disabled || busy}
        onPress={onPress}
        onLongPress={onPress}
        delayLongPress={500}
        testID="touchable-area"
        accessibilityRole="button"
        {...rest}
      >
        <View style={styles.iconContainer}>
          {busy && !disabled && (
            <Loader loading size={size} style={styles.loaderStyle} outline={outline} />
          )}
          {icon && !busy && !endIcon && (
            <Icon
              source={icon}
              size={size}
              outline={outline}
              disabled={disabled}
              endIcon={endIcon}
            />
          )}
          <Text
            style={
              appoitmentDetailButton
                ? [
                    styles.titleStyleAppointment,
                    css`
                      font-family: ${variables.nunitoRegular};
                    `,
                    css`
                      font-size: ${getButtonSize(size).fontSize};
                    `,
                    disabled && styles.titleStyleDisabled,

                    outline && {
                      color: '#0031B2',
                    },
                    outline && disabled && styles.titleStyleOutlineDisabled,
                  ]
                : [
                    styles.titleStyle,
                    css`
                      font-family: ${variables.nunitoBold};
                    `,
                    size &&
                      css`
                        font-size: ${getButtonSize(size).fontSize};
                      `,
                    disabled && styles.titleStyleDisabled,

                    outline && {
                      color: '#0031B2',
                    },
                    outline && disabled && styles.titleStyleOutlineDisabled,
                    textStyle,
                  ]
            }
          >
            {title}
          </Text>
          {icon && endIcon && !busy && (
            <Icon
              source={icon}
              size={size}
              outline={outline}
              disabled={disabled}
              endIcon={endIcon}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { Button };
