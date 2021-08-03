import React, { FC } from 'react';
import styled from 'styled-components';
import DEFAULT_ICON from '../assets/imgs/default-logo.png';
import Registion from '../assets/member-register.json';

const MemberLogo: FC<{
  className?: string;
  address?: string;
}> = ({ className, address }) => {
  return (
    <div className={className}>
      <img src={address && (Registion as any)[address] ? `/static/media/${address}.png` : DEFAULT_ICON} alt='' />
    </div>
  );
};

export default styled(MemberLogo)`
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    max-width: 100%;
    max-height: 100%;
  }
`;
