import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@root/types';

type VonageScreenNavigationType = StackNavigationProp<
  RootStackParamList,
  'Vonage'
>;

type VonageScreenRouteProps = RouteProp<RootStackParamList, 'Vonage'>;

export interface VonageScreenProps {
  navigation: VonageScreenNavigationType;
  route: VonageScreenRouteProps;
}
