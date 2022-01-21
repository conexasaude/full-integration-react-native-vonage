import React, { FunctionComponent, useEffect } from 'react';
import { Animated, ImageStyle } from 'react-native';

import { Spinner, run } from '@util/animations';

import loadingSource from '@icons/loader.png';

import variables from '@root/variables';

interface LoaderProps {
  loading: boolean;
  size?: 'sm' | 'md' | 'lg' | undefined;
  style?: ImageStyle;
  outline?: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({
  loading,
  size,
  style,
  outline,
}) => {


  useEffect(() => {
    if (loading) {
      run();
    }
  }, [loading]);

  function getLoaderSize(sizeArg: 'sm' | 'md' | 'lg' | undefined) {
    if (sizeArg === 'sm') return 20;
    if (sizeArg === 'md') return 30;
    if (sizeArg === 'lg') return 40;
    return 24;
  }

  return loading ? (
    <Animated.Image
      style={[
        {
          transform: [{ rotate: Spinner }],
          alignSelf: 'center',
          tintColor: outline ? variables.primary500 : variables.defaultWhite,
          width: getLoaderSize(size),
          height: getLoaderSize(size),
        },
        style,
      ]}
      source={loadingSource}
    />
  ) : (
    <></>
  );
};
