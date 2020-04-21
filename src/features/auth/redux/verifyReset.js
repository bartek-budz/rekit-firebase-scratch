import {
  AUTH_VERIFY_RESET_BEGIN,
  AUTH_VERIFY_RESET_SUCCESS,
  AUTH_VERIFY_RESET_FAILURE,
  AUTH_VERIFY_RESET_DISMISS_ERROR,
} from './constants';
import { Firebase } from '../../../common/firebase.js';

export function verifyReset(code) {
  return (dispatch) => {
    dispatch({
      type: AUTH_VERIFY_RESET_BEGIN,
    });

    return new Promise((resolve, reject) => {      
      Firebase.auth().verifyPasswordResetCode(code).then(
        (res) => {
          dispatch({
            type: AUTH_VERIFY_RESET_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTH_VERIFY_RESET_FAILURE,
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

export function dismissVerifyResetError() {
  return {
    type: AUTH_VERIFY_RESET_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_VERIFY_RESET_BEGIN:      
      return {
        ...state,
        verifyResetPending: true,
        verifyResetError: null,
      };

    case AUTH_VERIFY_RESET_SUCCESS:      
      return {
        ...state,
        verifyResetPending: false,
        verifyResetError: null,
        email: action.data
      };

    case AUTH_VERIFY_RESET_FAILURE:      
      return {
        ...state,
        verifyResetPending: false,
        verifyResetError: action.data.error,
      };

    case AUTH_VERIFY_RESET_DISMISS_ERROR:      
      return {
        ...state,
        verifyResetError: null,
      };

    default:
      return state;
  }
}
