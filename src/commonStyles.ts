import { makeStyles, theme } from '@conexasaude/styles';
import { css } from '@emotion/native';
import { ThemeContext } from '@root/theme';

import variables from '@root/variables';
import { useContext } from 'react';

const commonStyles = makeStyles({
  RootStylesCommon: () => {
    const { theme } = useContext(ThemeContext);
    const { colors } = theme;
    return {
      mainText: css`
        color: ${colors.neutral[900]};
        font-size: 20px;
        top: 20;
        margin-bottom: -22;
        font-family: ${variables.nunitoBold};
        text-transform: capitalize;
      `,
      defaultText: css`
        font-family: ${variables.nunitoRegular};
        color: ${variables.greyish};
        font-size: 16px;
      `,
    };
  },
});
export default commonStyles;
