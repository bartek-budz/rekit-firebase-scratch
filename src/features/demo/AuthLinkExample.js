import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { AuthLink, RestrictedContent } from '../auth';
import { ExamplesNavigation } from '.';

export default class AuthLinkExample extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="demo-auth-link-example">
        <ExamplesNavigation active="AuthLink"/>
        <Alert variant="primary">
          <Alert.Heading>AuthLink</Alert.Heading>
          <p>When you are signed in, <AuthLink to="/demo/auth-link-target">AuthLink</AuthLink>, redirects directly to the target location.
          However, when you are not yet signed in, it redirects you to the sign in page. Then, after successful sign in, you will be redirected to the link target.</p>
          <p><AuthLink>AuthLink without a target</AuthLink> is active only when you are signed out, and it redirects you back to the same page after successful sign in.</p>
          <p><AuthLink signOut>AuthLink with signOut property</AuthLink> is active when you are signed in, and it signs you out without changing location.</p>
          <p><AuthLink signOut  to="/demo/auth-link-target">AuthLink with signOut property and target</AuthLink> redirects you to the target location after successful sign out.</p>
          <hr />
          <RestrictedContent fallback={<p>You are signed out. <AuthLink>Sign in</AuthLink> to test how the links work for authenticated users.</p>}>
            <p>You are signed in. <AuthLink signOut>Sign out</AuthLink> to test how the links work for unaunthenticated users.</p>
          </RestrictedContent>                 
        </Alert>
      </div>
    );
  }
}
