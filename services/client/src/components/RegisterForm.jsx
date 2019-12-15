import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  registerRequest,
  registerSuccess,
  registerFailure
} from '../redux/user/userActions';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    setSubmitDisabled(true);
    const data = { email, password };
    dispatch(registerRequest());
    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/auth/register`, data)
      .then(res => {
        dispatch(registerSuccess(res.data.auth_token));
      })
      .catch(err => {
        if (err.response) {
          dispatch(registerFailure(err.response));
        } else {
          dispatch(registerFailure(err));
        }
      });
    setSubmitDisabled(false);
  };

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <label htmlFor='email' className='row'>
            <div className='form-label col-form-label col-sm-2'>Email</div>
            <div className='col'>
              <input
                type='email'
                className='form-control'
                id='email'
                sm='10'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='row'>
            <div className='form-label col-form-label col-sm-2'>Password</div>
            <div className='col'>
              <input
                type='password'
                className='form-control'
                id='password'
                sm='10'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </label>
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          disabled={submitDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
