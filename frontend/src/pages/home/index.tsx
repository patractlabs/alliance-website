import { FC } from 'react';
import styled from 'styled-components';
import AllianceRule from './AllianceRule';
import Banner from './Banner';
import CurrentMembers from './CurrentMembers';
import Goals from './Goals';
import RecentAnnouncements from './RecentAnnouncements';

const Home: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <Banner />
      <Goals />
      <AllianceRule />
      <CurrentMembers />
      <RecentAnnouncements />
    </div>
  );
};

export default styled(Home)``;
