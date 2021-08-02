import { FC } from 'react';
import styled from 'styled-components';
import { Style } from '../shared/style/const';

const Footer: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <a target='_blank' rel='noreferrer' href='https://polkadot.network'>
        https://polkadot.network
      </a>
    </div>
  );
};

export default styled(Footer)<{ type: 'primary' | 'default' }>`
  height: 74px;
  background: ${(props) => (props.type === 'primary' ? Style.bg.primary : Style.bg.second)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 14px;

  > a {
    color: ${(props) => (props.type === 'primary' ? 'rgba(255, 255, 255, 0.7)' : Style.label.second)};
  }
`;
