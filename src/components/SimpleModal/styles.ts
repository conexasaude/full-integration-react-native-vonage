import { makeStyles, theme } from '@conexasaude/styles';
import { css } from '@emotion/native';
import { ThemeContext } from '@root/theme';

import variables from '@root/variables';

const useStyles = makeStyles({
  RootStyles: () => ({
    containerMain: css`
      flex: 1;
      align-items: center;
      background: #fff;
    `,
    inputIcon: css`
      position: absolute;
      z-index: 2;
      left: 12px;
      margin-right: 12px;
      margin-top: 12px;
    `,
    containerText: css`
      max-width: 288px;
      width: 100%;
      margin-bottom: 30px;
    `,
    image: css`
      align-content: center;
      width: 250px;
      height: 200px;
    `,
    subtitle: css`
      margin-top: 20px;
      margin-bottom: 10px;
      margin-left: 12px;
      margin-right: 12px;
      font-family: ${variables.nunitoBold};
      font-size: 18px;
      color: #eeee;
    `,
    // containerForm: {},
    textMain: css`
      font-size: 26px;
      font-family: ${variables.nunitoBold};
      color: ${'#0031B2'};
      line-height: 38px;
      letter-spacing: -0.61px;
      margin-bottom: 5px;
    `,
    inputContainer: css`
      width: 100%;
      flex-direction: row;
    `,
    text: css`
      font-family: ${variables.nunitoRegular};
      font-size: 12px;
      text-transform: uppercase;
      color: ${'#2D2F34'};
    `,
    inputField: css`
      margin-bottom: 20px;
    `,
    txtInput: css`
      z-index: 1;
      width: 100%;
      background-color: ${variables.lightGray};
      border-radius: 8px;
      height: 50px;
      padding: 15px;
      font-size: 16px;
      padding-left: 45px;
    `,
    modalView: css`
      width: 298px;
      margin: 20px;
      background-color: white;
      border-radius: 8px;
      align-items: center;
      //elevation: 5
    `,
    modalHeader: css`
      width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-color: ${'#4064C5'};
      padding: 18px 20px 18px 20px;
    `,
    modalBody: css`
      flex-direction: row;
      justify-content: center;
      padding: 24px;
      width: 100%;
    `,
    headerTitle: css`
      font-size: 20px;
      color: ${variables.defaultWhite};
      font-family: ${variables.nunitoBold};
      line-height: 26px;
      letter-spacing: -0.42px;
    `,

    btnClose: css`
      width: 44px;
      height: 44px;
      align-self: flex-end;
      justify-content: flex-start;
      margin-bottom: 5px;
    `,
    imgClose: css`
      /* tint-color: ${variables.defaultWhite}; */
      width: 44px;
      height: 44px;
      /* resize-mode: contain;   */
    `,
    btnModal1: css`
      // marginLeft: 200,
      right: -120px;
      top: 15px;
    `,
    btnModal: css`
      width: 100px;
    `,
    textTouchable: css`
      font-family: ${variables.nunitoBold};
      color: ${variables.primary500};
      // left: 50,
    `,
    centeredView: css`
      flex: 1;
      justify-content: center;
      align-items: center;
      background-color: ${variables.modalOverlay};
    `,
  }),
});
export default useStyles;
