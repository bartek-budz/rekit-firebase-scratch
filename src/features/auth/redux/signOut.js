import {
  AUTH_SIGN_OUT_BEGIN,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE,
  AUTH_SIGN_OUT_DISMISS_ERROR,
} from './constants';
import { Firebase } from '../../../common/firebase.js'

export function signOut(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: AUTH_SIGN_OUT_BEGIN,
    });

    return new Promise((resolve, reject) => {

      Firebase.auth().signOut().then(
        (res) => {
          dispatch({
            type: AUTH_SIGN_OUT_SUCCESS,
            data: res,
          });
          resolve(res);
        },        
        (err) => {
          dispatch({
            type: AUTH_SIGN_OUT_FAILURE,
            data: { 
              error: {
                code: err.code,
                message: err.message
              }
            },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissSignOutError() {
  return {
    type: AUTH_SIGN_OUT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGN_OUT_BEGIN:
      return {
        ...state,
        signOutPending: true,
        signOutError: null,
      };

    case AUTH_SIGN_OUT_SUCCESS:
      return {
        ...state,
        signOutPending: false,
        signOutError: null,
        userData: null
      };

    case AUTH_SIGN_OUT_FAILURE:
      return {
        ...state,
        signOutPending: false,
        signOutError: action.data.error,
      };

    case AUTH_SIGN_OUT_DISMISS_ERROR:
      return {
        ...state,
        signOutError: null,
      };

    default:
      return state;
  }
}
