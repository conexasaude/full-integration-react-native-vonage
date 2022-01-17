import { Dimensions, StyleSheet } from 'react-native';
import { makeStyles } from '@conexasaude/styles';
import variables from '@root/variables';
import { css } from '@emotion/native';
import { useContext } from 'react';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 15,
    fontFamily: variables.nunitoBold,
    marginBottom: 2,
    color: variables.neutral900,
  },
  loadingMessage: {
    fontSize: 15,
    fontFamily: variables.nunitoBold,
    color: variables.neutral500,
  },
  videoContainer: {
    width,
    height: 350,
    padding: 20,
    marginBottom: 50,
  },
  video: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainerRoom: {
    width,
    height,
  },
  mainVideo: {
    width: '100%',
    height,
  },
  terciaryVideo: {
    width: '100%',
    height,
  },
  secondaryVideo: {
    width: 84,
    height: 116,
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 99999,
  },
  textName: {
    color: 'white',
  },
  textContainerName: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99999,
    padding: 5,
  },
  containerVideoSubscriber: {
    position: 'relative',
  },
  loader: {
    height: 50,
    width: 50,
    marginTop: 20,
    marginBottom: 22,
    tintColor: variables.theme.heroPrimary500,
  },
  buttonResize: {
    zIndex: 99999,
    position: 'absolute',
    // right: 20,
    left: 16,
    top: 16,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.neutral600,
    padding: 7,
    borderRadius: 5,
    height: 45,
    width: 45,
  },
});
