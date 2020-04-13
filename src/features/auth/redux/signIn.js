import {
  AUTH_SIGN_IN_BEGIN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_IN_DISMISS_ERROR,
} from './constants';
import { Firebase, getAuthPersistence } from '../../../common/firebase.js';


export function signIn(email, password, remember) {
  return (dispatch, getState) => { 
    dispatch({
      type: AUTH_SIGN_IN_BEGIN,
    });

    const setPersistence = () => Firebase.auth().setPersistence(getAuthPersistence(remember))
    const signInWithEmailAndPassword = () => Firebase.auth().signInWithEmailAndPassword(email, password)

    return new Promise((resolve, reject) => { 
      setPersistence()
        .then(signInWithEmailAndPassword)
        .then(
          (res) => {            
            dispatch({
              type: AUTH_SIGN_IN_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: AUTH_SIGN_IN_FAILURE,
              data: { 
                error: {
                  code: err.code,
                  message: err.message
                }
              },
            });
            reject(err);
          }
      );
    });
  };
}

export function dismissSignInError() {
  return {
    type: AUTH_SIGN_IN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGN_IN_BEGIN:
      return {
        ...state,
        signInPending: true,
        signInError: null,
      };

    case AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        signInPending: false,
        signInError: null,
        userData: action.data.user
      };

    case AUTH_SIGN_IN_FAILURE:
      return {
        ...state,
        signInPending: false,
        signInError: action.data.error,
      };

    case AUTH_SIGN_IN_DISMISS_ERROR:
      return {
        ...state,
        signInError: null,
      };

    default:
      return state;
  }
}
