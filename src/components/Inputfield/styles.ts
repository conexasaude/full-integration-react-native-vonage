import { makeStyles } from '@conexasaude/styles';
import { css } from '@emotion/native';
import variables from '@root/variables';

export default makeStyles({
  RootStyles: () => ({
    container: css`
      justify-content: center;
      width: 100%;
    `,
    inputStyles: css`
      height: 48px;
      padding: 4px 10px 0;
      font-family: ${variables.nunitoRegular};
      // line-height: 19px;
      font-size: 14px;
      color: #707683;
    `,
    labelStyles: css`
      font-family: ${variables.nunitoRegular};
      line-height: 19px;
      color: #f64040;
      background: #fff;
      padding: 0 5px;
    `,
    iconContainer: css`
      align-content: center;
      justify-content: center;
    `,
    iconStyles: css`
      width: 14.5px;
      height: 14.5px;
      margin-right: 10px;
    `,
    textError: css`
      font-family: ${variables.nunitoRegular};
      font-size: 12px;
      color: #f64040;
      margin-top: 4px;
    `,
  }),
});
