import { useContext, cloneElement } from 'react';
import { ThemeContext } from '@root/theme';

const SvgImage = ({ svg }: any) => {
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;
  return cloneElement(svg, {
    primary100: colors.primary[100],
    primary200: colors.primary[200],
    primary300: colors.primary[300],
    primary400: colors.primary[400],
    primary500: colors.primary[500],
    primary600: colors.primary[600],
    primary700: colors.primary[700],
    primary800: colors.primary[800],
    primary900: colors.primary[900],
    secondary100: colors.secondary[100],
    secondary200: colors.secondary[200],
    secondary300: colors.secondary[300],
    secondary400: colors.secondary[400],
    secondary500: colors.secondary[500],
    secondary600: colors.secondary[600],
    secondary700: colors.secondary[700],
    secondary800: colors.secondary[800],
    secondary900: colors.secondary[900],
  });
};

export { SvgImage };
