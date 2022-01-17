import { Platform } from 'react-native';

export async function getPlatform() {
  if (Platform.OS === 'android') {
    return 'ANDROID';
  }
  return 'IOS';
}
