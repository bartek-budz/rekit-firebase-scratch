import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Button, Form, Spinner } from 'react-bootstrap';
import { PopUp } from '../common';

export class SignInForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const {email, signInPending, signInError} = this.props.auth // todo: on email change update global state
    const {signIn, dismissSignInError} = this.props.actions
    const locked = signInPending

    const onFormSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget
      if (form.checkValidity()) {
        const email = form.email.value
        const password = form.password.value
        const remember = form.remember.checked
        signIn(email, password, remember)
      }
      else {
        event.stopPropagation();   
      } 
    };

    return (
      <div className="auth-sign-in-form">
        <PopUp show={signInError != null} title="Sign in failed" message={signInError && signInError.message} onClose={dismissSignInError} />
        <Form onSubmit={onFormSubmit}>     

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email"
              placeholder="Enter email"
              defaultValue={email}
              disabled={locked}
              required />
            <Form.Text className="text-muted">
              Your email address is your login
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              disabled={locked}
              required />
          </Form.Group>

          <Form.Group controlId="remember">
            <Form.Check 
              type="checkbox"
              label="Remember me"
              disabled={locked}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={locked}>
            {signInPending &&
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            }
            { signInPending ? ' Signing in...' : 'Sign in'}                  
          </Button>    
                        
        </Form> 
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
)(SignInForm);
