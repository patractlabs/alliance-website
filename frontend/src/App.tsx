import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home';
import Announcement from './pages/announcement';
import Member from './pages/member';
import Blacklist from './pages/blacklist';
import Candidate from './pages/candidate';
import MemberDetail from './pages/member/Detail';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/announcement'>
          <Announcement />
        </Route>
        <Route path='/member' exact>
          <Member />
        </Route>
        <Route path='/member/:accountId'>
          <MemberDetail />
        </Route>
        <Route path='/candidate'>
          <Candidate />
        </Route>
        <Route path='/blacklist'>
          <Blacklist />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
