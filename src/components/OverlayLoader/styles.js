import { StyleSheet, Dimensions } from 'react-native';
import variables from '../../variables';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    width: '100%',
    height,
    backgroundColor: 'rgba(255,255,255,.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999,
  },

  centeredViewIOS: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: variables.modalOverlay,
  },
});
