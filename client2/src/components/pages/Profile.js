import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile';

function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [eyeColor, setEyeColor] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [picture, setPicture] = useState('');
  const [isActive, setIsActive] = useState(null);
  const [balance, setBalance] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  // Auth header
  const headers = {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('jwtToken'),
  };

  // makes put request to api to edit user's info
  const editUserInfo = () => {
    const newInfo = {
      email,
      password,
      firstName,
      lastName,
      age,
      eyeColor,
      company,
      phone,
      address,
      picture,
      isActive,
    };

    axios
      .put('/api/edit', newInfo, { headers })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // makes request to api to get user info
  // runs everytime component mounts
  useEffect(() => {
    axios
      .get('/api/user', { headers })
      .then(res => {
        setEmail(res.data.email);
        setFirstName(res.data.name.first);
        setLastName(res.data.name.last);
        setAge(res.data.age);
        setEyeColor(res.data.eyeColor);
        setCompany(res.data.company);
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setPicture(res.data.picture);
        setIsActive(res.data.isActive);
        setBalance(res.data.balance);
        setPassword(res.data.password);
        setIsVisible(true);
      })
      .catch(err => {
        console.log(err.response);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <div className="profile row">
      {isVisible ? (
        <div className="inner-profile">
          <div>
            <img
              src={picture}
              alt="profilePicture"
              className="avatar img-fluid"
            />
          </div>

          <div>
            <ul className="list-group-flush mt-4">
              <li className="list-group-item align-items-center justify-content-between d-flex">
                <span className="balance">{balance}</span>
                <button
                  className="btn btn-info mb-2 edit-btn"
                  onClick={() => setIsVisible(false)}
                >
                  Edit Info
                </button>
              </li>

              <li className="list-group-item align-items-center justify-content-between d-flex">
                {firstName} {lastName}
                <span className="badge badge-outline badge-pill">Name</span>
              </li>

              <li className="list-group-item align-items-center justify-content-between d-flex">
                {email}
                <span className="badge badge-outline badge-pill">Email</span>
              </li>

              <li className="list-group-item align-items-center justify-content-between d-flex">
                {age} years old
                <span className="badge badge-outline badge-pill">Age</span>{' '}
              </li>

              <li className="list-group-item align-items-center justify-content-between d-flex">
                {eyeColor}
                <span className="badge badge-outline badge-pill">
                  Eye Color
                </span>
              </li>

              <li className="list-group-item align-items-center justify-content-between d-flex">
                {company}
                <span className="badge badge-outline badge-pill text-center">
                  Company
                </span>
              </li>

              <li className="list-group-item align-items-center justify-content-between d-flex">
                {phone}
                <span className="badge badge-outline badge-pill">Phone</span>
              </li>

              <li className="list-group-item align-items-center justify-content-between d-flex">
                {address}
                <span className="badge badge-outline badge-pill">Address</span>
              </li>
            </ul>
          </div>
          <div>{isActive}</div>
        </div>
      ) : (
        <EditProfile
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          age={age}
          eyeColor={eyeColor}
          company={company}
          phone={phone}
          address={address}
          isActive={isActive}
          picture={picture}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPassword={setPassword}
          setAge={setAge}
          setEyeColor={setEyeColor}
          setCompany={setCompany}
          setPhone={setPhone}
          setAddress={setAddress}
          setIsActive={setIsActive}
          setPicture={setPicture}
          editUserInfo={editUserInfo}
        />
      )}
    </div>
  );
}

export default Profile;
