import React from 'react';

function EditProfile(props) {

  return (
    <div className="m-5">
      <h3 className="edit-h3">Edit Your Profile</h3>

      <form onSubmit={props.editUserInfo}>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Name</span>
          </div>

          <input
            type="text"
            required
            value={props.firstName}
            className="form-control"
            onChange={e => props.setFirstName(e.target.value)}
          />
          <input
            type="text"
            required
            value={props.lastName}
            className="form-control"
            onChange={e => props.setLastName(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Email</span>
          </div>
          <input
            type="email"
            required
            value={props.email}
            className="form-control"
            onChange={e => props.setEmail(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Password</span>
          </div>
          <input
            type="password"
            required
            value={props.password}
            className="form-control"
            onChange={e => props.setPassword(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Age</span>
          </div>
          <input
            type="number"
            required
            value={props.age}
            className="form-control"
            onChange={e => props.setAge(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Eye Color</span>
          </div>
          <input
            type="text"
            required
            value={props.eyeColor}
            className="form-control"
            onChange={e => props.setEyeColor(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Company</span>
          </div>
          <input
            type="text"
            required
            value={props.company}
            className="form-control"
            onChange={e => props.setCompany(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Phone</span>
          </div>
          <input
            type="text"
            required
            value={props.phone}
            className="form-control"
            onChange={e => props.setPhone(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Address</span>
          </div>
          <input
            type="text"
            required
            value={props.address}
            className="form-control"
            onChange={e => props.setAddress(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Picture</span>
          </div>
          <input
            type="url"
            required
            value={props.picture}
            className="form-control"
            onChange={e => props.setPicture(e.target.value)}
          />
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text mr-1">Is Active?</span>
          </div>
          <select
            className="custome-select"
            id="inputGroupSelect"
            onChange={e => props.setIsActive(e.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
