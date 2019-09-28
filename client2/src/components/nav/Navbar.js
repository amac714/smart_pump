import React from 'react';
import '../app/App.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// Navbar component
// displays a logout button if user is logged in
function Navbar(props) {

  // handle logging out
  const logOut = () => {
    axios
      .get('/api/logout')
      .then(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwtToken');
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  // if user is not logged in, do not render navbar
  if (!localStorage.getItem('isLoggedIn')) {
    return (
      <></>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">Smart Pump</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button type="button" className="btn btn-link" onClick={logOut}>
              LOGOUT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
