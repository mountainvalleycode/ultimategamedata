import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { HomePage } from './HomePage';
import { CharacterPage } from './CharacterPage';
import { MatchupPage } from './MatchupPage';
import { StagePage } from './StagePage';
import { RankingsPage } from './RankingsPage';
import { AboutPage } from './AboutPage';
import { Header } from './Header';

import './styles.scss';
import Container from '@material-ui/core/Container';


export default function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/character">
          <CharacterPage/>
        </Route>
        <Route path="/stage">
          <StagePage/>
        </Route>
        <Route path="/matchup">
          <MatchupPage/>
        </Route>
        <Route path="/rankings">
          <RankingsPage/>
        </Route>
        <Route path="/about">
          <AboutPage/>
        </Route>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App/>, document.getElementById('react-root'));
