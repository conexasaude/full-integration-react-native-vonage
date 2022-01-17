import { theme } from '@conexasaude/styles';
import { ThemeContext } from '@root/theme';
import React, { FunctionComponent, useContext } from 'react';
import { Image, ImageSourcePropType } from 'react-native';

interface ButtonIconProps {
  source: ImageSourcePropType;
  size?: 'sm' | 'md' | 'lg' | undefined;
  outline?: boolean;
  disabled?: boolean;
  endIcon?: boolean;
}

export const Icon: FunctionComponent<ButtonIconProps> = ({
  source,
  size,
  outline,
  disabled,
  endIcon,
}) => {
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;

  function getSize(sizeArg: 'sm' | 'md' | 'lg' | undefined) {
    if (sizeArg === 'sm') return 20;
    return 24;
  }

  return (
    <Image
      source={source}
      style={[
        {
          width: getSize(size),
          height: getSize(size),
          tintColor: colors.common.white,
        },
        endIcon ? { marginLeft: 8 } : { marginRight: 8 },
        outline && { tintColor: theme.colors.primary[500] },
        disabled && { tintColor: colors.extra.disabled_font },
      ]}
    />
  );
};
