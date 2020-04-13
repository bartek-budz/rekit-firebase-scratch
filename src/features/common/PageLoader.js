import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

export default class PageLoader extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="common-page-loader">
        <Spinner className="spinner" animation="border" variant="primary"/>
      </div>
    );
  }
}
