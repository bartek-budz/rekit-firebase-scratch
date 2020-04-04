import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Button, Form, Spinner } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { PopUp } from '../common';
import { isValidEmail, validatePassword, getPasswordValidationMessage } from './utils.js';

export class SignUpForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    email: this.props.auth.email,
    password: '',
    confirmation: '',
    agreement: false,
  }

  render() {  
    const localState = this.state
    const globalState = this.props.auth
    const {signUpPending, signUpError} = globalState
    const {setState, signUp, dismissSignUpError} = this.props.actions
    const locked = signUpPending
    
    const onEmailChange = (event) => {
      const email = event.target.value
      const isEmailValid = isValidEmail(email)
      const emailValidationMessage = isEmailValid ? null : 'Enter a valid e-mail address!'
      this.setState({email, isEmailValid, emailValidationMessage})
      setState({email})
    }

    const onPasswordChange = (event) => {
      const oldValue = localState.password
      const newValue = event.target.value
      const changed = oldValue.localeCompare(newValue) !== 0
      if (changed) {
        const validationResult = validatePassword(newValue)    
        const isPasswordValid = validationResult.valid
        const passwordValidationMessage = isPasswordValid ? null : getPasswordValidationMessage(validationResult)
        const passwordsMatch = localState.passwordsMatch != null && checkIfPasswordsMatch(newValue, localState.confirmation) 
        this.setState({password: newValue, isPasswordValid, passwordValidationMessage, passwordsMatch})
      }
    }

    const onConfirmationChange = (event) => {
      const confirmation = event.target.value
      const passwordsMatch = localState.passwordsMatch != null && checkIfPasswordsMatch(localState.password, confirmation) 
      this.setState({confirmation, passwordsMatch})
    }

    const checkIfPasswordsMatch = function(password, confirmation) {
      return password.localeCompare(confirmation) === 0    
    }

    const onSubmit = (event) => {
      event.preventDefault();
      if (event.currentTarget.checkValidity()) {        
        console.debug(localState)
        signUp(localState.email, localState.password)
      }
      else {
        event.stopPropagation();   
      } 
    };    

    return (
      <div className="auth-sign-up-form">
        <PopUp show={localState.showTermsAndConsitions === true} title="Terms and conditions" message="TBD" onClose={() => this.setState({showTermsAndConsitions: false})} />  
        <PopUp show={signUpError != null} title="Sign up failed" message={signUpError && signUpError.message} onClose={dismissSignUpError} />
        <Form onSubmit={onSubmit}>

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email"
              placeholder="Enter email"
              defaultValue={localState.email}
              onChange={onEmailChange}                    
              isValid={localState.isEmailValid === true}
              isInvalid={localState.isEmailValid === false}
              disabled={locked}
              required/>                  
            <Form.Control.Feedback type="invalid">{localState.emailValidationMessage}</Form.Control.Feedback>      
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Enter password"
              onChange={onPasswordChange}
              defaultValue={localState.password}
              isValid={localState.isPasswordValid === true}
              isInvalid={localState.isPasswordValid === false}
              disabled={locked}
              required />
            <Form.Control.Feedback type="invalid">{localState.passwordValidationMessage}</Form.Control.Feedback>                          
          </Form.Group> 

          <Form.Group controlId="confirmation">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Enter password"
              onChange={onConfirmationChange}
              defaultValue={localState.confirmation}
              isValid={localState.passwordsMatch === true}
              isInvalid={localState.passwordsMatch === false}
              disabled={locked}
              required />
            <Form.Control.Feedback type="invalid">Passwords don't match</Form.Control.Feedback>                          
          </Form.Group>                 

          <Form.Group>
            <Form.Check required
              label="Agree to"
              feedback="You must agree before submitting."
              style={{display: 'inline'}}
              disabled={locked}
            />
            <Form.Label>&nbsp;<a href="#showModal" onClick={() => this.setState({showTermsAndConsitions: true})}>terms and conditions</a></Form.Label>
          </Form.Group>                             
          <Button variant="primary" type="submit" disabled={locked}>
            {signUpPending &&
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            }
            { signUpPending ? ' Signing up...' : 'Sign up'}                  
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
)(withTranslation()(SignUpForm));
