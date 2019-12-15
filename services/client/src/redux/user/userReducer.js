import * as types from './userTypes';

const initialState = {
  loading: false,
  authToken: '',
  error: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.REGISTER_SUCCESS:
      return {
        loading: false,
        authToken: action.payload,
        error: ''
      };
    case types.REGISTER_FAILURE:
      return {
        loading: false,
        authToken: '',
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
