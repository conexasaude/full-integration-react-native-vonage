import { makeStyles } from '@conexasaude/styles';
import { css } from '@emotion/native';
import variables from '@root/variables';
import { useContext } from 'react';
import { ThemeContext } from '@root/theme';

export default makeStyles({
  RootStyles: () => ({
    container: css`
      align-items: center;
      justify-content: center;
      padding: 17px 20px;
      border-radius: 5px;
    `,
    labelStyle: css`
      font-family: ${variables.nunitoBold};
      font-size: 16px;
      color: #0031b2;
    `,
  }),
});
