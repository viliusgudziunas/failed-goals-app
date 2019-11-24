import React, { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    setSubmitDisabled(true);
    // API call

    console.log(email, password);
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
