import {
  AUTH_RESET_PASSWORD_BEGIN,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
  AUTH_RESET_PASSWORD_DISMISS_ERROR,
} from './constants';
import { Firebase } from '../../../common/firebase.js';
import { buildActionCodeSettings } from '../utils.js';
import { getCurrentLanguageConfig } from '../../../common/i18n';

export function resetPassword(email, nextURL) {
  return (dispatch) => {
    dispatch({
      type: AUTH_RESET_PASSWORD_BEGIN,
    });
    
    return new Promise((resolve, reject) => {      
      const auth = Firebase.auth()
      auth.languageCode = getCurrentLanguageConfig().firebaseCode
      auth.sendPasswordResetEmail(email, buildActionCodeSettings(nextURL)).then(
        (res) => {
          dispatch({
            type: AUTH_RESET_PASSWORD_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTH_RESET_PASSWORD_FAILURE,
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

export function dismissResetPasswordError() {
  return {
    type: AUTH_RESET_PASSWORD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_RESET_PASSWORD_BEGIN:
      return {
        ...state,
        resetPasswordPending: true,
        resetPasswordError: null,
        resetPasswordSuccess: false,
      };

    case AUTH_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordPending: false,
        resetPasswordError: null,
        resetPasswordSuccess: true,
      };

    case AUTH_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordPending: false,
        resetPasswordError: action.data.error,
      };

    case AUTH_RESET_PASSWORD_DISMISS_ERROR:
      return {
        ...state,
        resetPasswordError: null,
      };

    default:
      return state;
  }
}
