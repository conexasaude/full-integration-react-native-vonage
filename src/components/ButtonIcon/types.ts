import { ReactNode } from 'react';

export interface ButtonIconProps {
  round?: boolean;
  size?: number;
  icon?: string;
  color?: string;
  clear?: boolean;
  FAQ?: boolean;
  backgroundColor?: string;
  onPress?: () => void;
  rotation?: string;
  borderRadius?: number;
  width?: number | string;
  height?: number;
  borderWidth?: number;
  margin?: number;
  borderColor?: string;
  marginRight?: number;
  marginBottom?: number;
  hasImagesIcons?: boolean;
  title?: string;
  subtitle?: string;
  image?: any;
  left?: string;
  top?: string;
  Svg?: ReactNode;
}
