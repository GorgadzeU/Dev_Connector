import * as alertTypes from './alert.types';
import uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();

  dispatch({
    type: alertTypes.SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch({ type: alertTypes.REMOVE_ALERT, payload: id });
  }, timeout);
};
