import { FC } from 'react';
import styled from 'styled-components';

const Announcements: FC<{ className?: string }> = ({ className }) => {
  return <div className={className}>Announcements</div>;
};

export default styled(Announcements)``;
