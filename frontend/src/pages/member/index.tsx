import { FC } from 'react';
import styled from 'styled-components';

const Member: FC<{ className?: string }> = ({ className }) => {
  return <div className={className}>Member</div>;
};

export default styled(Member)``;
