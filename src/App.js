import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Search from './pages/Search';
import Table from './pages/Table';

function App() {
  return (
    <Switch>
      <Route path="/table"><Table /></Route>
      <Route exact path="/"><Search /></Route>
      <Route><Redirect to="/" /></Route>
    </Switch>
  );
}

export default App;
