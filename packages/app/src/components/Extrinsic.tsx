import React, { FC } from 'react';
import styled from 'styled-components';

const Extrinsic: FC<{
  className?: string;
  block?: string | null;
  extrinsic?: number | null;
  motionIndex?: number | null;
  withBackslash?: boolean;
}> = ({ className, block, extrinsic, motionIndex, withBackslash = false }) => {
  if (typeof motionIndex === 'number') {
    return (
      <span className={className}>
        {withBackslash ? '/' : ''} Alliance Motion(#{motionIndex})
      </span>
    );
  }

  return (
    <a
      className={className}
      target='_blank'
      rel='noreferrer'
      href={`https://polkadot.subscan.io/extrinsic/${block}-${extrinsic}`}
    >
      {!block || typeof extrinsic !== 'number' ? '' : `${withBackslash ? '/' : ''} Extrinsic(#${block}-${extrinsic})`}
    </a>
  );
};

export default styled(Extrinsic)`
  margin-right: 24px;
  margin-left: 8px;
  opacity: 0.7;
  font-size: 12px;
  color: #2a292b;
`;
