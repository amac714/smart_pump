import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Renders component if user is logged in
// or else redirect to login route
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('isLoggedIn') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/"/>
      )
    }
  />
);
