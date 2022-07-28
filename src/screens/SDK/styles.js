import variables from '@root/variables';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  inputContainer: {
    padding: 26,
    backgroundColor: variables.defaultWhite,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ededef',
    borderRadius: 8,
  },
  shadowStyle: {
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    elevation: 5,
  },
  btnHelp: {
    marginTop: 10,
    alignSelf: 'center',
  },
  containerSignup: {
    flexDirection: 'row',
    marginTop: 16,
  },
  btnForgotPassword: {
    alignSelf: 'flex-end',
  },
  btnText: {
    fontFamily: variables.nunitoSemiBold,
    color: '#0031b2',
    fontSize: 14,
    marginBottom: 14,
  },
  btnSignupText: {
    fontFamily: variables.nunitoSemiBold,
    color: '#4e535c',
    fontSize: 14,
    margin: 18,
  },
  inputContainerTitle: {
    maxWidth: 240,
    width: '100%',
    color: '#2d2f34',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: variables.nunitoBold,
    textAlign: 'center',
    marginBottom: 38,
  },

  mainContainer: {
    backgroundColor: variables.backgroundDefault,
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  inputLabelError1: {
    fontFamily: variables.nunitoRegular,
    color: '#f64040',
    top: -30,
    left: -88,
  },
  inputLabelError: {
    fontFamily: variables.nunitoRegular,
    color: '#f64040',
    top: 3,
    left: -88,
  },
});
