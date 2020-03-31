// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  AUTH_SET_GLOBAL_STATE,
} from './constants';

export function setGlobalState(change) {
  return {
    type: AUTH_SET_GLOBAL_STATE,
    change
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SET_GLOBAL_STATE:
      return {
        ...state,
        ...action.change
      };

    default:
      return state;
  }
}
