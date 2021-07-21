import { FC } from 'react';
import styled from 'styled-components';

const Table: FC<{ className?: string }> = ({ className }) => {
  return <div className={className}>table</div>;
};

export default styled(Table)``;
