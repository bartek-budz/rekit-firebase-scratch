// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Login,
  Register,
  ResetPassword,
} from './';

export default {
  path: 'auth',
  name: 'Auth',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'login', name: 'Login', component: Login },
    { path: 'register', name: 'Register', component: Register },
    { path: 'reset', name: 'Reset password', component: ResetPassword },
  ],
};
