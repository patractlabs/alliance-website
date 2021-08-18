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

export const markdownStyle = `
  font-size: 16px;

  p {
    font-size: 16px;

  }
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 36px;
  }
  h3 {
    font-size: 32px;
  }
  h4 {
    font-size: 28px;
  }
  h5 {
    font-size: 24px;
  }
  h6 {
    font-size: 20px;
  }
`;
