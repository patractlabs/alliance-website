import { FC } from 'react';
import styled from 'styled-components';

const Line: FC<{ className?: string }> = ({ className }) => {
  return <div className={className}>CollapsibleDetail</div>;
};

export default styled(Line)``;
