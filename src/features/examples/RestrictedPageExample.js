import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { SignOutButton, RestrictedPage } from '../auth';
import { ExamplesNavigation } from '.';

export default class RestrictedPageExample extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="examples-restricted-page-example">
        <ExamplesNavigation active="RestrictedPage"/>
        <RestrictedPage>
          <Alert variant="success">
            <Alert.Heading>If you see this, it means you are authenticated</Alert.Heading>
            <p>This whole page is restricted to authenticated users.</p>
            <hr />
            <SignOutButton variant="outline-success" />
          </Alert>
        </RestrictedPage>
      </div>
    );
  }
}
