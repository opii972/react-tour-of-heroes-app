import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Heroes from './Heroes/Heroes';
import HeroDetail from './HeroDetail/HeroDetail';

import './App.scoped.css';
import Messages from './Messages/Messages';

const App = () => (
  <div className="app">
    <h1>Tour of Heroes</h1>
    <nav>
      <Link to={'/dashboard'}>Dashboard</Link>
      <Link to={'/heroes'}>Heroes</Link>
    </nav>
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/heroes">
        <Heroes />
      </Route>
      <Route path="/detail/:id">
        <HeroDetail />
      </Route>
    </Switch>
    <Messages />
  </div>
);

export default App;
