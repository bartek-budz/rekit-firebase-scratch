import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import {Button, Col, Container, Form, Row } from 'react-bootstrap';

export class ResetPassword extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const globalState = this.props.auth
    return (
      <div className="auth-reset-password">
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    defaultValue={globalState.email}
                    required />
                  <Form.Text className="text-muted">
                    Confirmation link will be sent to this e-mail
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Reset password
                </Button>
              </Form>
              <p>Remember password? <Link to="/auth/login">Sign in</Link></p>
              <p>Don't have an account? <Link to="/auth/register">Sign up</Link></p>
            </Col>
          </Row>
        </Container>   
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
