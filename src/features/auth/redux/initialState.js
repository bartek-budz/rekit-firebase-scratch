const initialState = {
  email: '',  
  userData: undefined,
  signUpPending: false,
  signUpError: null,
  signUpVerificationRequested: false,
  signInPending: false,
  signInError: null,
  signOutPending: false,
  signOutError: null,
  resetPasswordPending: false,
  resetPasswordError: null,
  resetPasswordSuccess: false,
  changePasswordPending: false,
  changePasswordError: null,
  changePasswordSuccess: false,
  verifyResetPending: false,
  verifyResetError: null,
  verifyEmailPending: false,
  verifyEmailError: null,
  verifyEmailSuccess: false,
};

export default initialState;
