import { makeStyles } from '@conexasaude/styles';
import { css } from '@emotion/native';
import { ThemeContext } from '@root/theme';
import variables from '@root/variables';
import { useContext } from 'react';

const useStyles = makeStyles({
  RootStyles: () => ({
    container: css`
      align-items: center;
      justify-content: center;
      align-self: flex-start;
    `,
    button: css`
      border-radius: 8px;
    `,
    containerDisabled: css`
      background: #dadee2;
    `,
    containerOutline: css`
      background-color: transparent;
      border-width: 2px;
      border-color: #0031b2;
    `,
    containerOutlineDisabled: css`
      background: transparent;
      border-width: 2px;
      border-color: #dadee2;
    `,
    content: css`
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `,
    titleStyle: css`
      font-family: ${variables.nunitoBold};
      color: ${variables.defaultWhite};
      font-size: 16px;
      line-height: 24px;
      align-self: center;
      height: 100%;
    `,

    titleStyleAppointment: css`
      font-family: ${variables.nunitoRegular};
      color: ${variables.defaultWhite};
      font-size: 14px;
      letter-spacing: 2px;
      margin-bottom: 5px;
      font-weight: 700;
      line-height: 24px;
      align-self: center;
      height: 100%;
    `,

    titleStyleDisabled: css`
      color: #dadee2;
    `,
    titleStyleOutlineDisabled: css`
      color: #bdbcbc;
    `,
    iconContainer: css`
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `,
    loaderStyle: css`
      margin-right: 8px;
    `,
  }),
});

export default useStyles;
