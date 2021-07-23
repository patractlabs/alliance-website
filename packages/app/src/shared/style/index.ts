import { createGlobalStyle } from 'styled-components';

import fontCss from './font';

export const colorPrimary = '#FF3043';

export const colorPrimary2 = '#654FF0';

export default createGlobalStyle<{
  linkColor: string;
}>(
  ({ linkColor }) => `

  svg * {
    transition: fill 0.3s, stroke 0.3s, opacity 0.3s;
  }

  a:hover {
    color: ${linkColor};

    > svg path {
      fill: ${linkColor}
    };
  }

  ${fontCss()}
`
);
