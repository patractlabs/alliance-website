import React, { CSSProperties, FC, useCallback } from 'react';
import styled from 'styled-components';
import AccountDisplay from './AccountDisplay';
import MoreSvg from '../assets/imgs/more-link.svg';
import { Motion } from '../hooks';

const Proposer: FC<{
  className?: string;
  motion?: Motion;
  style?: CSSProperties;
}> = ({ className, motion, style }) => {
  const goto = useCallback(
    () =>
      motion && window.open(`https://polkadot.subscan.io/extrinsic/${motion.createBlock}-${motion.createExtrinsic}`),
    [motion]
  );

  return (
    <div className={className} onClick={goto} style={style}>
      <AccountDisplay id={motion?.proposerId || ''} />
      {motion && <img src={MoreSvg} alt='' />}
    </div>
  );
};

export default styled(Proposer)`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
`;
