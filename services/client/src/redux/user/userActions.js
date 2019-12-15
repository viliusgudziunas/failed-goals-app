import * as types from './userTypes';

export const registerRequest = () => {
  return { type: types.REGISTER_REQUEST };
};

export const registerSuccess = authToken => {
  return { type: types.REGISTER_SUCCESS, payload: authToken };
};

export const registerFailure = error => {
  return { type: types.REGISTER_FAILURE, payload: error };
};
