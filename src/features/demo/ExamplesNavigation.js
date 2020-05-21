import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class ExamplesNavigation extends Component {
  static propTypes = {
    active: PropTypes.string,
  };

  render() {
    return (
      <div className="demo-examples-navigation">
        <Breadcrumb>
          <LinkContainer to="/" exact>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </LinkContainer>      
          {this.props.active ?
          <LinkContainer to="/demo" exact>
            <Breadcrumb.Item active={this.props.active == null}>Demo</Breadcrumb.Item>
          </LinkContainer>
          :
          <Breadcrumb.Item active>Demo</Breadcrumb.Item>
          }          
          {this.props.active &&
          <Breadcrumb.Item active>{this.props.active}</Breadcrumb.Item>
          }
        </Breadcrumb>
      </div>
    );
  }
}
