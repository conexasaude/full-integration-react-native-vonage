import { ViewStyle } from 'react-native';

export interface ButtonIconProps {
  icon: string;
  isOn: boolean;
  style?: ViewStyle;
  onPress: () => void;
}
