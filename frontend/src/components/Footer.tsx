import { FC } from 'react';
import styled from 'styled-components';

const Footer: FC<{ className?: string }> = ({ className }) => {
  return <div className={className}>https//:polkadot.network</div>;
};

export default styled(Footer)`
  height: 74px;
  color: rgba(255, 255, 255, 0.7);
  background: #172026;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 14px;
`;
