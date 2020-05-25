// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import initialState from './initialState';
import { reducer as setStateReducer } from './setState';
import { reducer as signUpReducer } from './signUp';
import { reducer as signInReducer } from './signIn';
import { reducer as signOutReducer } from './signOut';
import { reducer as resetPasswordReducer } from './resetPassword';
import { reducer as changePasswordReducer } from './changePassword';
import { reducer as verifyResetReducer } from './verifyReset';
import { reducer as verifyEmailReducer } from './verifyEmail';

const reducers = [
  setStateReducer,
  signUpReducer,
  signInReducer,
  signOutReducer,
  resetPasswordReducer,
  changePasswordReducer,
  verifyResetReducer,
  verifyEmailReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
