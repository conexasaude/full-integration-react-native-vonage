import React, { createContext, useEffect, useState } from 'react';
import { Theme, theme as heroTheme } from '@conexasaude/styles';
import merge from 'deepmerge';
import { apiBaseURL } from '@root/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@root/store/modules/rootReducer';
import { ThemeAssets } from '@root/variables';

export const ThemeContext = createContext({
  changeColors: (clinicId?: string) => {},
  theme: heroTheme,
});

const ThemeProviderLocal = ({ children }: any) => {
  const [heroThemeState, setHeroThemeState] = useState<Theme>(heroTheme);

  const clinic = useSelector(
    (state: RootState) => state.chosenClinic.chosenClinic
  );

  useEffect(() => {
    if (ThemeAssets.appType === 'docpass') {
      changeColors('2');
    }

    if (clinic?.clinica?.id) {
      changeColors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinic]);

  const changeColors = async (clinicId?: string) => {
    const response = await apiBaseURL.get(
      `whitelabel/config/cores/${clinicId || clinic?.clinica?.id}`
    );

    if (response.data.status === 200) {
      const colors = response.data.object;

      const newTheme: Theme = merge(heroTheme, {
        colors,
      } as Partial<Theme>);

      setHeroThemeState(newTheme);
    } else {
      const newTheme: Theme = merge(heroTheme, heroTheme);
      setHeroThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        changeColors: (clinicId?: string) => changeColors(clinicId),
        theme: heroThemeState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProviderLocal };
