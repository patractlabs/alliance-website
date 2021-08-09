import React, { CSSProperties, FC, useCallback } from 'react';
import styled from 'styled-components';
import { Motion } from '../hooks';
import AccountWithExtrinsic from './AccountWithExtrinsic';

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
      <AccountWithExtrinsic
        accountId={motion?.proposerId}
        block={motion?.createBlock}
        extrinsic={motion?.createExtrinsic}
      />
      {/* {motion && <img src={MoreSvg} alt='' />} */}
    </div>
  );
};

export default styled(Proposer)`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
`;
