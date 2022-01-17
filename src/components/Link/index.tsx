import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { css } from '@emotion/native';

import { LinkProps } from './types';

import useStyles from './styles';

export const Link: FunctionComponent<LinkProps> = ({
  label,
  color,
  style,
  fontSize,
  ...rest
}) => {
  const { RootStyles } = useStyles();

  const { container, labelStyle } = RootStyles;

  return (
    <TouchableOpacity style={[container, style]} {...rest}>
      <Text
        style={[
          labelStyle,
          color &&
            css`
              color: ${color};
            `,
          fontSize && {
            fontSize,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
