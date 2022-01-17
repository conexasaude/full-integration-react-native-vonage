import { StyleSheet } from 'react-native';
import variables from '@root/variables';

export default StyleSheet.create({
  footer: {
    backgroundColor: 'transparent',
    zIndex: 999999,
    // marginBottom: 10,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newMessagesAmountContainer: {
    top: -18,
    position: 'absolute',
    height: 24,
    width: 24,
    right: -18,
    zIndex: 9999999,
    borderRadius: 12,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27b468',
  },
  newMessagesAmount: {
    fontFamily: variables.nunitoRegular,
    alignSelf: 'center',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
});
