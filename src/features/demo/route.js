// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ExamplesIndex,
  RestrictedPageExample,
  RestrictedContentExample,
  LanguageButtonExample,
  AuthLinkExample,
  AuthLinkTarget,
} from './';

export default {
  path: 'demo',
  childRoutes: [
    { path: '', name: 'Examples', component: ExamplesIndex, isIndex: true },
    { path: 'restricted-page', name: 'Restricted Page example', component: RestrictedPageExample },
    { path: 'restricted-content', name: 'Restricted Content example', component: RestrictedContentExample },
    { path: 'language-button', name: 'Language button example', component: LanguageButtonExample },
    { path: 'auth-link', name: 'Auth link example', component: AuthLinkExample },
    { path: 'auth-link-target', name: 'Auth link target', component: AuthLinkTarget },
  ],
};
