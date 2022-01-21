import React, { createContext, useEffect, useState } from 'react';
import { Theme, theme as heroTheme } from '@conexasaude/styles';
import merge from 'deepmerge';
import { apiBaseURL } from '@root/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@root/store/modules/rootReducer';
import { ThemeAssets } from '@root/variables';

export const ThemeContext = createContext({
  changeColors: (clinicId?: string) => {},
  theme: {},
});



