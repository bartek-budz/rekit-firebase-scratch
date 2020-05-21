**Demo**: https://rekit-react-firebase.firebaseapp.com

# About

The goal of this project is to deliver a "scratch" aka "boilerplate" aka "template" aka "starter kit" of a Progressive Web App based on [React](https://reactjs.org) framework with serverless backend powered by [Firebase](https://firebase.google.com), for those wanting to utilize these technologies along with [Rekit React feature oriented architecture](https://docs.rekit.org/app-types/rekit-react) and [Rekit Studio](https://rekit.js.org) as IDE.

### Features

- Email & password authentication with Firebase purely as a backend.
- Internationalization that fully interacts with Firebase - e.g. email to confirm password reset is sent in the language selected by the user in the app, then the language setting is propagated in the password reset link (done)

### To be done

- Email verification after sign up
- User account management (change email, drop account etc)
- Basic database operations support

### Dependencies (other than default Rekit React stack)
- [Firebase](https://firebase.google.com) for authentication
- [React Bootstrap](https://react-bootstrap.github.io) for UI (using [Less port of Bootstrap](https://www.npmjs.com/package/bootstrap-less-port)), enhanced with [React Router integration](https://github.com/react-bootstrap/react-router-bootstrap)
- [i18next](https://www.i18next.com) for internationalization

# Getting started

### Prerequisites
- install [npm](https://www.npmjs.com)
- sign up to [Firebase Console](https://console.firebase.google.com)
- install [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)
- install Rekit: ```npm install -g rekit rekit-studio```

### Set up the app
- clone this repo
- in the main project folder, execute `npm install` to download all the dependencies

### Set up Firebase
- go to [Firebase Console](https://console.firebase.google.com)
- if you haven't done it yet, create a new firebase project (free subscription should be enough)
- enable email & password authentication
- go to authentication -> templates -> edit one of the e-mail templates -> edit action URL template (by default it is like `https://(your-app-id).firebaseapp.com/__/auth/action`) - set it to `https://(your-app-id).firebaseapp.com/auth/action` (remove `__` before `/auth`)
- go to project settings, add web app (if you want to use Firebase hosting, you can choose it at this point or later) 
- at the end you should be able to generate similar config: 

```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY,
  authDomain: "YOUR-APP-ID.firebaseapp.com",
  databaseURL: "https://YOUR-APP-ID.firebaseio.com",
  projectId: "YOUR-APP-ID",
  storageBucket: "YOUR-APP-ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

- in the root project dir, create dotenv config file (e.g. `.env.local` ), populate it with your firebase project config properties as follows:
```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR-APP-ID.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://YOUR-APP-ID.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=YOUR-APP-ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR-APP-ID.appspot.com
REACT_APP_FIREBASE_MESSAGE_SENDER_ID=YOUR_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
```
also, for proper handling of continueUrl in email messages, add the `REACT_APP_BASE_URL` property with your app base URL, e.g.
```
REACT_APP_BASE_URL=https://YOUR-APP-ID.firebaseapp.com
```
- in the root project dir, execute `firebase init`
- select hosting from Firebase features
- select your project or create a new one
- enter `build` when asked for a public directory
- enter `Y` when asked whether to configure as single-page app
- for other options use defaults

### Run it

- ```rekit-studio``` or ```rekit-studio -p (PORT NUMBER)``` to launch Rekit Studio
- ```npm start``` to launch the app locally

### Deploy to Firebase Hosting

1. `npm run-script build` to build the app
2. ```firebase deploy``` to deploy it

# Components

## Authentication

### RestrictedContent

Displays its content only to authenticated users

````
<RestrictedContent loader={<p>Loading...</p>} fallback={<p>Sign in to see me!</p>}>
  <p>I see you are signed in, good job!</p>
</RestrictedContent>
````

#### API

````
import RestrictedContent from '../auth';
````

| Name     | Type | Default | Description                                       |
| -------- | ---- | ------- | ------------------------------------------------- |
| loader   | node |         | Rendered while Firebase Auth is being initialized |
| fallback | node |         | Rendered when user is not signed in               |

### RestrictedPage

Replaces its content with authentication dialogs for unauthenticated users. 
Wraps RestrictedContent, rendering the authentication dialogs as fallback.

````
<RestrictedPage>
  <p>This whole page is restricted to authenticated users.</p>
</RestrictedPage>
````

#### API

````
import RestrictedPage from '../auth';
````

| Name     | Type | Default                                                                                                                                                    | Description                                       |
| -------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| loader   | node | PageLoader, a custom component from the commons feature, that renders [Spinner](https://react-bootstrap.github.io/components/spinners) on the page center. | Rendered while Firebase Auth is being initialized |

### AuthLink

Ensures that user is signed in (or out) before redirecting to the target path.
Based on the [React Router Link](https://reacttraining.com/react-router/web/api/Link).

````
<AuthLink to="/feature/link-target">Make sure user is signed in</AuthLink>

<AuthLink signOut to="/feature/link-target">Make sure user is signed out</AuthLink>
````

AuthLink works well as a support for RestrictedContent:

````
<RestrictedContent fallback={<p>You are signed out. <AuthLink>Sign in</AuthLink>.</p>}>
    <p>You are signed in. <AuthLink signOut>Sign out</AuthLink>.</p>
</RestrictedContent>    
````

#### API

````
import AuthLink from '../auth';
````

| Name     | Type   | Default          | Description                                                                                     |
| -------- | ------ | ---------------- | ----------------------------------------------------------------------------------------------- |
| to       | string | current location | React Router Link target. Leave empty to sign in / sign out without changing the location.      |
| signOut  | bool   | false            | Add this flag (or set it to true) to enable the sign out mode                                   |
| loader   | node   | plain link text  | Rendered while Firebase Auth is being initialized                                               |
| fallback | node   | plain link text  | Rendered when user is already signed in (in the sign out mode: when user is already signed out) |
| pending  | node   | plain link text  | Only in the sign out mode - rendered while sign out action is pending                           |

## Internationalization

### LanguageButton 

[Dropdown button](https://react-bootstrap.github.io/components/dropdowns) that allows for dynamic change of the app language. Displays [flags](https://www.npmjs.com/package/react-world-flags) related to the loaded languages.

````
<LanguageButton />
````

For the time being, the language configuration (such as language code / flag mapping) is in the [src/common/i18n.js](src/common/i18n.js) file.

#### API

````
import LanguageButton from '../common';
````

| Name     | Type   | Default | Description                                                                              |
| -------- | ------ | ------- | ---------------------------------------------------------------------------------------- |
| variant  | string | primary | [React Bootstrap Button's](https://react-bootstrap.github.io/components/buttons) variant |
