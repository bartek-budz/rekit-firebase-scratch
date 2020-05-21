import React, { Component } from 'react';
import { AuthLink } from '../auth';
import { Alert } from 'react-bootstrap';
import { SignOutButton, RestrictedContent } from '../auth';
import { ExamplesNavigation } from '.';

export default class RestrictedContentExample extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="demo-restricted-content-example">
        <ExamplesNavigation active="RestrictedContent"/>
        <Alert variant="warning">
          <Alert.Heading>Hello guest!</Alert.Heading>
          <p>This you can see without authorization, but if you <AuthLink>sign in</AuthLink>, I can show you something more.</p>
          <RestrictedContent fallback={<p><AuthLink>Sign in</AuthLink> to see the paragraph</p>}>
            <p>I see you are signed in, good job!</p>
            <hr />
            <SignOutButton variant="outline-warning" />   
          </RestrictedContent>
        </Alert>
      </div>
    );
  }
}
