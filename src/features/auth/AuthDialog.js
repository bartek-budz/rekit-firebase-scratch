import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { LanguageButton } from '../common';

export default class AuthDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    form: PropTypes.node.isRequired,
    links: PropTypes.node,
  };

  render() {    
    return (
      <div className="auth-auth-dialog">
        <Container>
          <Row>
            {this.props.title &&
            <Col xs={12} sm={9} className="auth-dialog-title">
              <h2>{this.props.title}</h2>
            </Col>
            }
            <Col xs={{span: 4, offset: 8}} sm={{ span: 3, offset: this.props.title ? 0 : 9 }}>
              <LanguageButton />
            </Col>
          </Row>
          <Row>
            <Col className="auth-dialog-section">{this.props.form}</Col>
          </Row>
          {this.props.links &&
          <Row>
            <Col className="auth-dialog-section">{this.props.links}</Col>
          </Row>          
          }          
        </Container>
      </div>
    );
  }
}
