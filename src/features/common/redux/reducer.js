// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import initialState from './initialState';
import { reducer as changeLanguageReducer } from './changeLanguage';

const reducers = [
  changeLanguageReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
