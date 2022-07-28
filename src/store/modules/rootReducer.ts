import { combineReducers } from 'redux';

import reducer from './sdk/reducers';

let rootReducer = combineReducers({ reducer });

export type RootState = ReturnType<typeof rootReducer>;

export default (state, action) => {
  if (action.type === '@auth/SIGN_OUT' && state !== undefined) {
    Object.keys(state).forEach((key) => {
      if (key !== 'magicLinks') {
        state[key] = undefined;
      }
    });
  }

  return rootReducer(state, action);
};
