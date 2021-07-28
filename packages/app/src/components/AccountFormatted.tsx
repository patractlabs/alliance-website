import React, { FC } from 'react';
import styled from 'styled-components';
import { Account } from '../hooks';

const AccountFormatted: FC<{
  className?: string;
  account?: Account | null;
}> = ({ className, account }) => {
  return (
    <div className={className}>
      <span>{account?.display || '-'}</span>
    </div>
  );
};

export default styled(AccountFormatted)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
