import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { SignOutButton, RestrictedContent, RestrictedPage } from '../auth';
import { FakeLink } from '../common';
import { ExamplesNavigation } from '.';

export default class RestrictedPageExample extends Component {
  static propTypes = {
  };

  state = {
    allowUnverified: true
  }

  render() {
    const {allowUnverified} = this.state    
    return (
      <div className="demo-restricted-page-example">
        <ExamplesNavigation active="RestrictedPage"/>
        <RestrictedContent allowUnverified={!allowUnverified}>
          <RestrictedContent fallback={<p>Below you can see how RestrictedPage works when it is configured to not let unverified users in. Confirm your email, or <FakeLink onClick={() => this.setState({allowUnverified: true})}>switch to the allowUnverified mode</FakeLink>.</p>} />
        </RestrictedContent>
        <RestrictedPage allowUnverified={allowUnverified}>
          <Alert variant="success">
            <Alert.Heading>If you see this, it means you are authenticated</Alert.Heading>
            <p>This whole page is restricted to authenticated users.</p>
            <RestrictedContent fallback={<p>You have not yet verified your email. <FakeLink onClick={() => this.setState({allowUnverified: false})}>See how RestrictedPage works when it is configured to not let unverified users in</FakeLink>.</p>} />
            <hr />
            <SignOutButton variant="outline-success" />
          </Alert>
        </RestrictedPage>
      </div>
    );
  }
}
