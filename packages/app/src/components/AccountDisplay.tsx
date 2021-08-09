import React, { FC } from 'react';
import styled from 'styled-components';
import { useAccount } from '../hooks';
import AccountFormatted from './AccountFormatted';

const AccountDispaly: FC<{
  className?: string;
  id?: string;
}> = ({ className, id }) => {
  const { data: account } = useAccount(id);

  return (
    <div className={className}>
      <AccountFormatted account={account} />
    </div>
  );
};

export default styled(AccountDispaly)`
  display: flex;
  align-items: center;
`;
