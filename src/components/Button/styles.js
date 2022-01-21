import { StyleSheet } from 'react-native';
import variables from '@root/variables';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  button: {
    borderRadius: 8,
  },
  containerDisabled: {
    backgroundColor: '#dadee2',
  },
  containerOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0031b2',
  },
  containerOutlineDisabled: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#dadee2',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: variables.nunitoBold,
    color: variables.defaultWhite,
    fontSize: 16,
    lineHeight: 24,
    alignSelf: 'center',
    height: '100%',
  },

  titleStyleAppointment: {
    fontFamily: variables.nunitoRegular,
    color: variables.defaultWhite,
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 5,
    fontWeight: '700',
    lineHeight: 24,
    alignSelf: 'center',
    height: '100%',
  },

  titleStyleDisabled: {
    color: '#dadee2',
  },
  titleStyleOutlineDisabled: {
    color: '#bdbcbc',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderStyle: {
    marginRight: 8,
  },
});
