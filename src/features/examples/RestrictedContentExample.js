import React, { Component } from 'react';
import { AuthLink } from '../auth';
import { Jumbotron } from 'react-bootstrap';
import { SignOutButton, RestrictedContent } from '../auth';

export default class RestrictedContentExample extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="examples-restricted-content-example">
        <Jumbotron>
          <h1>Hello guest!</h1>
          <p>This you can see without authorization, but if you <AuthLink>sign in</AuthLink>, I can show you something more.</p>
          <RestrictedContent fallback={<p><AuthLink>Sign in</AuthLink> to see the paragraph</p>}>
          <p>I see you are signed in, good job!</p>
          <SignOutButton />
          </RestrictedContent>
        </Jumbotron>
      </div>
    );
  }
}
