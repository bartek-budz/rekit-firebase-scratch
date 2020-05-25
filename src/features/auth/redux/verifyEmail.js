import {
  AUTH_VERIFY_EMAIL_BEGIN,
  AUTH_VERIFY_EMAIL_SUCCESS,
  AUTH_VERIFY_EMAIL_FAILURE,
  AUTH_VERIFY_EMAIL_DISMISS_ERROR,
  AUTH_VERIFY_EMAIL_DISMISS_SUCCESS,
} from './constants';
import { Firebase } from '../../../common/firebase.js';

export function verifyEmail(code) {
  return (dispatch) => {
    dispatch({
      type: AUTH_VERIFY_EMAIL_BEGIN,
    });

    return new Promise((resolve, reject) => {

      const errorHandler = error => {
        dispatch({
          type: AUTH_VERIFY_EMAIL_FAILURE,          
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

      auth.checkActionCode(code).then(
        (actionCodeInfo) => {
          auth.applyActionCode(code).then(() => {
            const currentUser = auth.currentUser
            if (currentUser && currentUser.email.localeCompare(actionCodeInfo.data.email) === 0) {
              currentUser.reload().then(() => {
                const data = {
                  actionCodeInfo,
                  currentUser
                }
                dispatch({
                  type: AUTH_VERIFY_EMAIL_SUCCESS,
                  data,
                });
                resolve(data);
              }, errorHandler)
            }
            else {
              const data = {actionCodeInfo}
              dispatch({
                type: AUTH_VERIFY_EMAIL_SUCCESS,
                data
              });
              resolve(data);              
            }            
          }, errorHandler)
        },
        errorHandler
      );
    });
  };
}

export function dismissVerifyEmailError() {
  return {
    type: AUTH_VERIFY_EMAIL_DISMISS_ERROR,
  };
}

export function dismissVerifyEmailSuccess() {
  return {
    type: AUTH_VERIFY_EMAIL_DISMISS_SUCCESS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_VERIFY_EMAIL_BEGIN:
      return {
        ...state,
        verifyEmailPending: true,
        verifyEmailError: null,
        verifyEmailSuccess: false,
      };

    case AUTH_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifyEmailPending: false,
        verifyEmailError: null,
        verifyEmailSuccess: true,
        email: action.data.actionCodeInfo && action.data.actionCodeInfo.data.email,
        userData: action.data.currentUser
      };

    case AUTH_VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        verifyEmailPending: false,
        verifyEmailError: action.data.error,        
      };

    case AUTH_VERIFY_EMAIL_DISMISS_ERROR:
      return {
        ...state,
        verifyEmailError: null,
      };

    case AUTH_VERIFY_EMAIL_DISMISS_SUCCESS:
      return {
        ...state,
        verifyEmailSuccess: false,
      };      

    default:
      return state;
  }
}
