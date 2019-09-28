import React from 'react';

import '../pages/Pages.css';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Navbar from '../nav/Navbar';
import ErrorPage from '../pages/Error';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { PrivateRoute } from '../routes/PrivateRoute';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
