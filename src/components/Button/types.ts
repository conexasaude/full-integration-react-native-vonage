import { ReactNativeStyle } from '@emotion/native';
import {
  ImageSourcePropType,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  icon?: ImageSourcePropType;
  appoitmentDetailButton?: boolean;
  endIcon?: boolean;
  busy?: boolean;
  outline?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  width?: string | number;
  height?: number;
  style?: ReactNativeStyle;
  textStyle?: TextStyle;
}

export interface ButtonSize {
  fontSize: string;
  padding: string;
  paddinOutline: string;
}
