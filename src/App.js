import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from './pages/Home';

function App() {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route><Redirect to="/" /></Route>
    </Switch>
  );
}

export default App;
