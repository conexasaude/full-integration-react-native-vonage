import { ReactNativeStyle } from '@emotion/native';
import { TouchableOpacityProps } from 'react-native';

export interface LinkProps extends TouchableOpacityProps {
  label: string;
  color?: string;
  fontSize?: number;
  style?: ReactNativeStyle;
}
