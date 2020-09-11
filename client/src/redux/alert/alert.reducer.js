import * as alertTypes from './alert.types';

const INIT_STATE = [];

const alertReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case alertTypes.SET_ALERT:
      return [...state, action.payload];
    case alertTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alertReducer;
