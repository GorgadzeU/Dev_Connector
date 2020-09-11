import * as authTypes from './auth.types';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { CLEAR_PROFILE } from '../profile/profile.types';

import setAuthToken from './auth.utils';

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:5000/api/auth');

    dispatch({
      type: authTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: authTypes.AUTH_ERROR });
  }
};

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      'http://localhost:5000/api/users',
      body,
      config
    );

    dispatch({
      type: authTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: authTypes.REGISTER_FAIL });
  }
};

//login useer
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth',
      body,
      config
    );

    dispatch({
      type: authTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: authTypes.LOGIN_FAIL });
  }
};

//lougout

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: authTypes.LOGOUT });
};
