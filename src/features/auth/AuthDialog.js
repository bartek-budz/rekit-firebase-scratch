import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { LanguageButton } from '../common';

export default class AuthDialog extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="auth-auth-dialog">
        <Container>
          <Row>
            <Col md={{ span: 4, offset: 8 }}>
              <LanguageButton />
            </Col>
          </Row>
          <Row>
            <Col md={12}>{this.props.children}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
