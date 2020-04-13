// http://rekit.js.org/docs/routing.html

import { SignInPage, SignUpPage, ResetPasswordPage } from './';

export default {
  path: 'auth',
  name: 'Auth',
  childRoutes: [
    { path: 'sign-in', name: 'Sign in', component: SignInPage, isIndex: true },
    { path: 'sign-up', name: 'Sign up', component: SignUpPage },
    { path: 'reset-password', name: 'Reset password', component: ResetPasswordPage },    
  ],
};
