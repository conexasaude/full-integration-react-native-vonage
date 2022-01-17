import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  setTimeout(() => {
    navigationRef?.current?.navigate(name, params);
  }, 200);
}
