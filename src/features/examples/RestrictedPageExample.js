import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { SignOutButton, RestrictedPage } from '../auth';

export default class RestrictedPageExample extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="examples-restricted-page-example">
        <RestrictedPage>
          <Alert variant="success">
            <Alert.Heading>Hey, nice to see you!</Alert.Heading>
            <p>This whole page is restricted to authenticated users.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <SignOutButton variant="outline-success" />      
            </div>
          </Alert>
        </RestrictedPage>
      </div>
    );
  }
}
