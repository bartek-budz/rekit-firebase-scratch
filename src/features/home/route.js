import {
  Home,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [    
    { path: '', name: 'Home', component: Home, isIndex: true },
  ],
};