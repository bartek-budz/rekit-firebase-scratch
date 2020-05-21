import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { ExamplesNavigation } from '.';

export default class AuthLinkTarget extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="demo-auth-link-target">
        <ExamplesNavigation active="AuthLink"/>
        <Alert variant="success">
          <Alert.Heading>AuthLink</Alert.Heading>
          <p>This is the link target page. <Link to='auth-link'>Return to AuthLink example</Link></p>   
        </Alert>
      </div>
    );
  }
}
