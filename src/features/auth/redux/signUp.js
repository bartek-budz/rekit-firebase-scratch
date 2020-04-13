import {
  AUTH_SIGN_UP_BEGIN,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAILURE,
  AUTH_SIGN_UP_DISMISS_ERROR,
} from './constants';
import { Firebase } from '../../../common/firebase.js'

export function signUp(email, password) {
  return (dispatch, getState) => {
    dispatch({
      type: AUTH_SIGN_UP_BEGIN,
    });

    return new Promise((resolve, reject) => {

      Firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (res) => {
          dispatch({
            type: AUTH_SIGN_UP_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {       
          dispatch({
            type: AUTH_SIGN_UP_FAILURE,
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

export function dismissSignUpError() {
  return {
    type: AUTH_SIGN_UP_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGN_UP_BEGIN:
      return {
        ...state,
        signUpPending: true,
        signUpError: null,
      };

    case AUTH_SIGN_UP_SUCCESS:
      return {
        ...state,        
        signUpPending: false,
        signUpError: null,
        userData: action.data.user
      };

    case AUTH_SIGN_UP_FAILURE:
      return {
        ...state,
        signUpPending: false,
        signUpError: action.data.error,
      };

    case AUTH_SIGN_UP_DISMISS_ERROR:
      return {
        ...state,
        signUpError: null,
      };

    default:
      return state;
  }
}
