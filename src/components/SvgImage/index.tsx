import {  cloneElement } from 'react';

const SvgImage = ({ svg }: any) => {

  return cloneElement(svg, {
    primary100: 'blue'
  });
};

export { SvgImage };
