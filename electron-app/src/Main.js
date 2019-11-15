import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import NotFound from './components/pages/notFound/NotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;
