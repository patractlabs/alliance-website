import React, { FC } from 'react';
import styled from 'styled-components';
import { Footer } from './';

const PageSkeleton: FC<{ className?: string }> = ({ className, children }) => {
  return (
    <React.Fragment>
      <div className={className}>
        <div className='bg-linear'></div>
        <div className='content'>{children}</div>
      </div>
      <Footer type='default' />
    </React.Fragment>
  );
};

export default styled(PageSkeleton)`
  flex: 1;
  padding: 0px 60px 30px 60px;

  > .bg-linear {
    z-index: 1;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 315px;
    background: linear-gradient(180deg, #f5f5f7, #ffffff);
  }

  > .content {
    margin-top: 108px;
    z-index: 10;
    position: relative;
  }
`;
