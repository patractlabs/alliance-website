import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home';
import Announcement from './pages/announcement';
import Member from './pages/member';
import Blacklist from './pages/blacklist';
import Candidate from './pages/candidate';
import MemberDetail from './pages/member/Detail';
import AnnouncementDetail from './pages/announcement/Detail';
import CandidateDetail from './pages/candidate/Detail';
import BlackDetail from './pages/blacklist/Detail';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/announcement' exact>
          <Announcement />
        </Route>
        <Route path='/announcement/:announcementId' exact>
          <AnnouncementDetail />
        </Route>
        <Route path='/member' exact>
          <Member />
        </Route>
        <Route path='/member/:accountId'>
          <MemberDetail />
        </Route>
        <Route path='/candidate' exact>
          <Candidate />
        </Route>
        <Route path='/candidate/:accountId'>
          <CandidateDetail />
        </Route>
        <Route path='/blacklist' exact>
          <Blacklist />
        </Route>
        <Route path='/blacklist/:address'>
          <BlackDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
