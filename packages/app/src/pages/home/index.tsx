import React, { FC } from 'react';
import styled from 'styled-components';
import { Footer } from '../../components';
import AllianceRule from './AllianceRule';
import Banner from './Banner';
import CurrentMembers from './CurrentMembers';
import Goals from './Goals';
import RecentAnnouncements from './RecentAnnouncements';

const Home: FC<{ className?: string }> = ({ className }) => {
  return (
    <React.Fragment>
      <div className={className}>
        <Banner />
        <Goals />
        <AllianceRule />
        <CurrentMembers />
        <RecentAnnouncements />
      </div>
      <Footer type='primary' />
    </React.Fragment>
  );
};

export default styled(Home)``;
