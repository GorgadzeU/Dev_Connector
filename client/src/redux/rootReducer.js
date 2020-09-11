import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducer';
import authReducer from './auth/auth.reducer';
import profileReducer from './profile/profile.reducer';

export default combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  profile: profileReducer,
});
