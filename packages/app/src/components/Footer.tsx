import { FC } from 'react';
import styled from 'styled-components';
import { Style } from '../shared/style/const';
import GithubSVG from '../assets/imgs/github.svg';

const Footer: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <a target='_blank' rel='noreferrer' href='https://polkadot.network'>
          https://polkadot.network
        </a>

        <a target='_blank' rel='noreferrer' href='https://github.com/patractlabs/alliance-website/'>
          <img src={GithubSVG} alt='' />
        </a>
      </div>
    </div>
  );
};

export default styled(Footer)<{ type: 'primary' | 'default' }>`
  display: flex;
  justify-content: center;
  background: ${(props) => (props.type === 'primary' ? Style.bg.primary : Style.bg.second)};

  > div {
    max-width: 1170px;
    width: 100%;
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    line-height: 14px;
    > a {
      > img {
        width: 28px;
        height: 28px;
      }
      color: ${(props) => (props.type === 'primary' ? 'rgba(255, 255, 255, 0.7)' : Style.label.second)};
    }
  }
`;
