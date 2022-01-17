import { makeStyles } from '@conexasaude/styles';
import { css } from '@emotion/native';

import variables from '@root/variables';

export const globalStyles = makeStyles({
  titleDefault: css`
    font-family: ${variables.nunitoSemiBold};
    font-size: 18px;
    line-height: 24px;
    color: ${variables.neutral900};
    margin: 16px 0;
  `,

  titleHeaderAppointmentDetails: css`
    text-align: left;
    font-family: ${variables.nunitoRegular};
    font-size: 24px;
    line-height: 32px;
    color: ${variables.theme.heroPrimary500};
  `,

  containerAppointmentDetails: css`
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 16px;
    flex: 1;
  `,

  subTitleAppointmentDetails: css`
    text-align: left;
    font-family: ${variables.nunitoRegular};
    font-size: 16px;
    line-height: 24px;
    color: ${variables.neutral900};
    margin-top: 20px;
    margin-bottom: 20px;
  `,
});
