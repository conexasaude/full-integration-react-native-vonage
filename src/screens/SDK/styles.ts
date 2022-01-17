import { makeStyles } from '@conexasaude/styles';
import { css } from '@emotion/native';

import variables from '@root/variables';

export default makeStyles({
  RootStyles: () => ({
    safeAreaContainer: css`
      flex: 1;
    `,
    inputContainer: css`
      padding: 26px 16px;
      background: ${variables.defaultWhite};
      align-items: center;
      border-width: 1px;
      border-color: #ededef;
      border-radius: 8px;
    `,
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
    btnHelp: css`
      margin-top: 10px;
      align-self: center;
    `,
    containerSignup: css`
      flex-direction: row;
      margin-top: 16px;
    `,
    btnForgotPassword: css`
      align-self: flex-end;
    `,
    btnText: css`
      font-family: ${variables.nunitoSemiBold};
      color: #0031b2;
      font-size: 14px;
      margin-bottom: 14px;
    `,
    btnSignupText: css`
      font-family: ${variables.nunitoSemiBold};
      color: #4e535c;
      font-size: 14px;
      margin: 18px 0;
    `,
    inputContainerTitle: css`
      max-width: 240px;
      width: 100%;
      color: #2d2f34;
      font-size: 20px;
      line-height: 24px;
      font-family: ${variables.nunitoBold};
      text-align: center;
      margin-bottom: 38px;
    `,

    mainContainer: css`
      background: ${variables.backgroundDefault};
      flex-grow: 1;
      padding-left: 16px;
      padding-right: 16px;
      justify-content: space-between;
    `,
    container: css`
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 0px;
      align-self: center;
    `,
    logoContainer: css`
      align-items: center;
    `,
    inputLabelError1: css`
      font-family: ${variables.nunitoRegular};
      color: #f64040;
      top: -30px;
      left: -88px;
    `,
    inputLabelError: css`
      font-family: ${variables.nunitoRegular};
      color: #f64040;
      top: 3px;
      left: -88px;
    `,
  }),
});
