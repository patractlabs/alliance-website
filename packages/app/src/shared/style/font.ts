import { Style } from './const';
import media, { marginMedia } from './media';

const createGlobal = (): string => `
  @font-face {
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 300;
    src: url(/static/fonts/WorkSans-Light.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: italic;
    font-weight: 300;
    src: url(/static/fonts/WorkSans-LightItalic.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 400;
    src: url(/static/fonts/WorkSans-Regular.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: italic;
    font-weight: 400;
    src: url(/static/fonts/WorkSans-RegularItalic.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 500;
    src: url(/static/fonts/WorkSans-Medium.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: italic;
    font-weight: 500;
    src: url(/static/fonts/WorkSans-MediumItalic.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 600;
    src: url(/static/fonts/WorkSans-SemiBold.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: italic;
    font-weight: 600;
    src: url(/static/fonts/WorkSans-SemiBoldItalic.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 700;
    src: url(/static/fonts/WorkSans-Bold.ttf);
  }
  @font-face {
    font-family: 'WorkSans';
    font-style: italic;
    font-weight: 700;
    src: url(/static/fonts/WorkSans-BoldItalic.ttf);
  }

  body {
    font-family: WorkSans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', 'Noto Color Emoji';
    color: #000;
  }

  h1 {
    margin: 0 0 24px;
    font-size: 44px;
    font-weight: 700;
    line-height: 58px;
    color: inherit;

    ${media('xxl')} {
      margin: 0 0 22px;
      font-size: 40px;
      line-height: 54px;
    }
    ${media('xl')} {
      margin: 0 0 20px;
      font-size: 38px;
      line-height: 50px;
    }
    ${media('lg')} {
      margin: 0 0 18px;
      font-size: 36px;
      line-height: 50px;
    }
    ${media('md')} {
      margin: 0 0 16px;
      font-size: 34px;
      line-height: 48px;
    }
    ${media('sm')} {
      margin: 0 0 14px;
      font-size: 32px;
      line-height: 46px;
    }
  }
  h2 {
    margin: 0 0 20px;
    font-size: 40px;
    font-weight: 700;
    line-height: 52px;
    color: inherit;

    ${media('xxl')} {
      margin: 0 0 22px;
      font-size: 36px;
      line-height: 48px;
    }
    ${media('xl')} {
      margin: 0 0 20px;
      font-size: 34px;
      line-height: 44px;
    }
    ${media('lg')} {
      margin: 0 0 18px;
      font-size: 32px;
      line-height: 44px;
    }
    ${media('md')} {
      margin: 0 0 16px;
      font-size: 30px;
      line-height: 42px;
    }
    ${media('sm')} {
      margin: 0 0 14px;
      font-size: 28px;
      line-height: 40px;
    }
  }
  h3 {
    margin: 0 0 20px;
    font-size: 36px;
    font-weight: 600;
    line-height: 44px;
    color: inherit;

    ${media('xxl')} {
      margin: 0 0 20px;
      font-size: 34px;
      line-height: 42px;
    }
    ${media('xl')} {
      margin: 0 0 16px;
      font-size: 32px;
      line-height: 40px;
    }
    ${media('lg')} {
      margin: 0 0 14px;
      font-size: 30px;
      line-height: 38px;
    }
    ${media('md')} {
      margin: 0 0 12px;
      font-size: 28px;
      line-height: 36px;
    }
    ${media('sm')} {
      margin: 0 0 10px;
      font-size: 26px;
      line-height: 34px;
    }
  }
  h4 {
    margin: 0 0 20px;
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
    color: inherit;

    ${media('xxl')} {
      margin: 0 0 20px;
      font-size: 26px;
      line-height: 32px;
    }
    ${media('xl')} {
      margin: 0 0 16px;
      font-size: 24px;
      line-height: 30px;
    }
    ${media('lg')} {
      margin: 0 0 14px;
      font-size: 22px;
      line-height: 28px;
    }
    ${media('md')} {
      margin: 0 0 12px;
      font-size: 20px;
      line-height: 26px;
    }
    ${media('sm')} {
      margin: 0 0 10px;
      font-size: 18px;
      line-height: 24px;
    }
  }
  h5 {
    margin: 0 0 20px;
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    color: inherit;

    ${media('xxl')} {
      margin: 0 0 20px;
    }
    ${media('xl')} {
      margin: 0 0 16px;
    }
    ${media('lg')} {
      margin: 0 0 14px;
      font-size: 22px;
      line-height: 24px;
    }
    ${media('sm')} {
      margin: 0 0 10px;
      font-size: 20px;
      line-height: 24px;
    }
  }
  h6 {
    ${marginMedia(0, 0.5)}
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    color: inherit;

    ${media('lg')} {
      font-size: 18px;
      line-height: 26px;
    }
    ${media('sm')} {
      font-size: 16px;
      line-height: 24px;
    }
  }

  p {
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: inherit;

    ${media('lg')} {
      font-size: 14px;
      line-height: 20px;
    }
  }
  .ant-breadcrumb {
    font-size: 12px;
    line-height: 14px;


    a:hover {
      color: ${Style.badge.primary};
    }
  }
`;

export default createGlobal;
