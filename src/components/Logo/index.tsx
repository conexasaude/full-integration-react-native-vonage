import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, Image } from 'react-native';

import { LogoImg } from '@root/variables';
import { LogoProps } from './types';

import styles from './styles';
import { SvgImage } from '../SvgImage';

export const Logo: FunctionComponent<LogoProps> = ({
  source = '',
  width = 115,
  height = 32,
  style,
  ...rest
}) => {
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
    <View style={[styles.container, style]}>
      {typeof source === 'string' && source && imageSource ? (
        <Image
          style={styles.imgStyle}
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
          svg={<LogoImg style={styles.imgStyle} width={width} height={height} />}
        />
      )}
    </View>
  );
};
