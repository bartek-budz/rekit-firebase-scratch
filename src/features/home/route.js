import {
  DefaultPage,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [    
    { path: '', name: 'Default Page', component: DefaultPage, isIndex: true },
  ],
};