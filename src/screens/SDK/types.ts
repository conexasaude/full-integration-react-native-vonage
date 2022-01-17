import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@root/types';
import { RouteProp } from '@react-navigation/native';

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

export type LoginScreenNavigationType = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export interface LoginScreenProps {
  navigation: LoginScreenNavigationType;
  route: ProfileScreenRouteProp;
}
