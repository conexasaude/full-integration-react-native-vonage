import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface LogoProps {
  source?: ImageSourcePropType;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}
