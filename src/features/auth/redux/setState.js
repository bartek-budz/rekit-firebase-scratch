import {
  AUTH_SET_STATE,
} from './constants';

export function setState(change) {
  return {
    type: AUTH_SET_STATE,
    change
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SET_STATE:
      return {
        ...state,
        ...action.change
      };

    default:
      return state;
  }
}
