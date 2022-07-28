import { StyleSheet } from 'react-native';
import variables from '@root/variables';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  inputStyles: {
    height: 48,
    paddingTop: 4,

    fontFamily: variables.nunitoRegular,
    // line-height: 19,
    fontSize: 14,
    color: '#707683',
  },
  labelStyles: {
    fontFamily: variables.nunitoRegular,
    lineHeight: 19,
    color: '#f64040',
    backgroundColor: '#fff',
    padding: 0,
  },
  iconContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  iconStyles: {
    width: 14.5,
    height: 14.5,
    marginRight: 10,
  },
  textError: {
    fontFamily: variables.nunitoRegular,
    fontSize: 12,
    color: '#f64040',
    marginTop: 4,
  },
});
