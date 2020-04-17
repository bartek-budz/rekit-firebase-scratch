import {
  AUTH_CHANGE_PASSWORD_BEGIN,
  AUTH_CHANGE_PASSWORD_SUCCESS,
  AUTH_CHANGE_PASSWORD_FAILURE,
  AUTH_CHANGE_PASSWORD_DISMISS_ERROR,
} from './constants';
import { Firebase } from '../../../common/firebase.js';

export function changePassword(code, newPassword) {
  return (dispatch) => {
    dispatch({
      type: AUTH_CHANGE_PASSWORD_BEGIN,
    });    

    return new Promise((resolve, reject) => {      
      Firebase.auth().confirmPasswordReset(code, newPassword).then(
        (res) => {          
          dispatch({
            type: AUTH_CHANGE_PASSWORD_SUCCESS,
            data: res,
          });
          resolve(res);
        },        
        (err) => {
          dispatch({
            type: AUTH_CHANGE_PASSWORD_FAILURE,
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

export function dismissChangePasswordError() {
  return {
    type: AUTH_CHANGE_PASSWORD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_CHANGE_PASSWORD_BEGIN:      
      return {
        ...state,
        changePasswordPending: true,
        changePasswordError: null,
        changePasswordSuccess: false,
      };

    case AUTH_CHANGE_PASSWORD_SUCCESS:      
      return {
        ...state,
        changePasswordPending: false,
        changePasswordError: null,
        changePasswordSuccess: true,
      };

    case AUTH_CHANGE_PASSWORD_FAILURE:      
      return {
        ...state,
        changePasswordPending: false,
        changePasswordError: action.data.error,
      };

    case AUTH_CHANGE_PASSWORD_DISMISS_ERROR:      
      return {
        ...state,
        changePasswordError: null,
      };

    default:
      return state;
  }
}
