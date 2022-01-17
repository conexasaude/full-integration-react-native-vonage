import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, Image } from 'react-native';

import { LogoImg } from '@root/variables';
import { LogoProps } from './types';

import useStyles from './styles';
import { SvgImage } from '../SvgImage';

export const Logo: FunctionComponent<LogoProps> = ({
  source = '',
  width = 115,
  height = 32,
  style,
  ...rest
}) => {
  const { container, imgStyle } = useStyles();
  const [imageSource, setImageSource] = useState<boolean>(true);

  useEffect(() => {
    if (typeof source === 'string') {
      const interval = setInterval(() => {
        Image.getSize(
          source,
          (success) => {
            setImageSource(true);
            clearInterval(interval);
          },
          (error) => {
            setImageSource(false);
            clearInterval(interval);
          }
        );
      }, 100);
    }
  }, [source]);

  return (
    <View style={[container, style]}>
      {typeof source === 'string' && source && imageSource ? (
        <Image
          style={imgStyle}
          source={{
            uri: `${source}?random=${Math.random().toString(36).substring(7)}`,
          }}
          width={width}
          height={height}
          resizeMode="contain"
          resizeMethod="resize"
          {...rest}
        />
      ) : (
        <SvgImage
          svg={<LogoImg style={imgStyle} width={width} height={height} />}
        />
      )}
    </View>
  );
};
