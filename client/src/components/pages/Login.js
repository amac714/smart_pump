import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';

// Login component
// uses localStorage to set isLoggedIn boolean and jwtToken
function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  // logs in user then redirects to user's profile
  const loginUser = userInfo => {
    axios
      .post('/api/login', userInfo)
      .then(res => {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('jwtToken', res.data.token);
        props.history.push('/profile');
      })
      .catch(err => {
        setErrors(err.response.data.error);
      });
  };

  const onSubmit = e => {
    e.preventDefault();
    const userInfo = { email, password };
    loginUser(userInfo);
  };

  return (
    <div>
      <img src={logo} alt="logo" className="logo" />
      <div className="login">
        {/* if username or password is empty or incorrect, error pops up
            clicking on error closes it  */}
        {errors.length > 0 ? (
          <div className="alert alert-danger" onClick={() => setErrors('')}>
            {errors}
          </div>
        ) : (
          ''
        )}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail">Username</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
