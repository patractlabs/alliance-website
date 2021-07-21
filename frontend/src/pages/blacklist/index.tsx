import { FC } from 'react';
import styled from 'styled-components';

const Blacklist: FC<{ className?: string }> = ({ className }) => {
  return <div className={className}>Blacklist</div>;
};

export default styled(Blacklist)``;
