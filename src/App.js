import React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './components/list';
import Create from './components/create';
import Update from './components/update';
import Details from './components/details';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={List} />
        <Route exact path={'/create'} component={Create} />
        <Route path={'/details/:id'} component={Details} />
        <Route path={'/update/:id'} component={Update} />
      </Switch>
    </div>
  );
}

export default App;
