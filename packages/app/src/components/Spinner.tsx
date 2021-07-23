import React, { FC } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { Style } from '../shared/style/const';

const Spinner: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={className}>
      <Loader type='Bars' color={Style.badge.primary} height={100} width={100} />
    </div>
  );
};

export default styled(Spinner)`
  height: 100px;
  width: 100px;
`;
