import React from 'react';

const RegisterForm = () => {
  return (
    <div className='container'>
      <h1>Register</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='email' className='row'>
            <div className='form-label col-form-label col-sm-2'>Email</div>
            <div className='col'>
              <input type='email' className='form-control' id='email' sm='10' />
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
              />
            </div>
          </label>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
