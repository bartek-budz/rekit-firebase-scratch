// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ExamplesIndex,
  RestrictedPageExample,
  RestrictedContentExample,
  LanguageButtonExample,
} from './';

export default {
  path: 'examples',
  name: 'Examples',
  childRoutes: [
    { path: 'examples-index', name: 'Examples', component: ExamplesIndex, isIndex: true },
    { path: 'restricted-page', name: 'Restricted Page example', component: RestrictedPageExample },
    { path: 'restricted-content', name: 'Restricted Content example', component: RestrictedContentExample },
    { path: 'language-button', name: 'Language button example', component: LanguageButtonExample },
  ],
};
