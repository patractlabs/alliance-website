import { FC } from 'react';
import styled from 'styled-components';

const Candidate: FC<{ className?: string }> = ({ className }) => {
  return <div className={className}>Candidate</div>;
};

export default styled(Candidate)``;
