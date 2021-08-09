import React, { FC } from 'react';
import styled from 'styled-components';
import AccountDisplay from './AccountDisplay';
import Extrinsic from './Extrinsic';

const AccountWithExtrinsic: FC<{
  className?: string;
  accountId?: string;
  block?: string;
  extrinsic?: number;
  withBorder?: boolean;
}> = ({ className, accountId, block, extrinsic, withBorder = false }) => {
  return (
    <div className={className}>
      <AccountDisplay id={accountId} key={accountId} />
      <Extrinsic block={block} extrinsic={extrinsic} />
      {withBorder && <div className='border'></div>}
    </div>
  );
};

export default styled(AccountWithExtrinsic)`
  display: flex;
  align-items: center;

  > .border {
    width: 1px;
    height: 18px;
    background: #bab8c0;
  }
`;
