import * as authTypes from './auth.types';
import { ACCOUNT_DELETED } from '../profile/profile.types';

const INIT_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: null,
  user: null,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case authTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case authTypes.REGISTER_SUCCESS:
    case authTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case authTypes.REGISTER_FAIL:
    case authTypes.AUTH_ERROR:
    case authTypes.LOGIN_FAIL:
    case authTypes.LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
