import {
  AUTH_SIGN_UP_BEGIN,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAILURE,
  AUTH_SIGN_UP_DISMISS_ERROR,
  AUTH_SIGN_UP_DISMISS_VERIFICATION_REQUESTED,
} from './constants';
import { REQUIRE_EMAIL_VERIFICATION } from '../config.js';
import { Firebase } from '../../../common/firebase.js'
import { buildActionCodeSettings } from '../utils.js';
import { getCurrentLanguageConfig } from '../../../common/i18n';

export function signUp(email, password, nextURL) {
  return (dispatch, getState) => {
    dispatch({
      type: AUTH_SIGN_UP_BEGIN,
    });

    return new Promise((resolve, reject) => {

      const resultHandler = result => {
        dispatch({
          type: AUTH_SIGN_UP_SUCCESS,
          data: result,
        });
        resolve(result);
      }

      const errorHandler = error => {
        dispatch({
          type: AUTH_SIGN_UP_FAILURE,
          data: { 
            error: {
              code: error.code,
              message: error.message
            }
          },
        });
        reject(error);
      }

      const auth = Firebase.auth()
      auth.languageCode = getCurrentLanguageConfig().firebaseCode
      
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(
          (createUserResult) => {
            if (REQUIRE_EMAIL_VERIFICATION) {              
              createUserResult.user
                .sendEmailVerification(buildActionCodeSettings(nextURL))
                .then(resultHandler(createUserResult), errorHandler)
            }
            else {
              resultHandler(createUserResult)
            }
          },
          errorHandler
        );
    });
  };
}

export function dismissSignUpError() {
  return {
    type: AUTH_SIGN_UP_DISMISS_ERROR,
  };
}

export function dismissSignUpVerificationRequested() {
  return {
    type: AUTH_SIGN_UP_DISMISS_VERIFICATION_REQUESTED,
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
        signUpVerificationRequested: REQUIRE_EMAIL_VERIFICATION,
        userData: action.data && action.data.user
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

    case AUTH_SIGN_UP_DISMISS_VERIFICATION_REQUESTED:
      return {
        ...state,
        signUpVerificationRequested: false,
      };      

    default:
      return state;
  }
}
