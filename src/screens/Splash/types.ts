import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@root/types';

export type SplashScreenNavigationType = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export interface SplashScreenProps {
  navigation: SplashScreenNavigationType;
}
