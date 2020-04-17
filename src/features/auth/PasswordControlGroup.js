import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { validatePassword, getPasswordValidationMessage } from './utils.js';
import { withTranslation } from 'react-i18next';

export class PasswordControlGroup extends Component {
  static propTypes = {    
    controlId: PropTypes.string,
    disabled: PropTypes.bool,
  };

  state = {
    password: '',    
    confirmation: '',
    isPasswordValid: null,
    passwordsMatch: null,
    passwordValidationMessage: null,
  }

  render() {
    const {controlId, disabled} = this.props
    const {password, confirmation, isPasswordValid, passwordsMatch, passwordValidationMessage} = this.state

    const onPasswordChange = (event) => {
      const oldValue = password
      const newValue = event.target.value
      const changed = oldValue.localeCompare(newValue) !== 0
      if (changed) {
        const validationResult = validatePassword(newValue)    
        const isPasswordValid = validationResult.valid
        const passwordValidationMessage = isPasswordValid ? null : getPasswordValidationMessage(validationResult, this.props.t)
        const passwordsMatch = isPasswordValid === true ? checkIfPasswordsMatch(newValue, confirmation) : null        
        this.setState({
          password: newValue, 
          isPasswordValid, 
          passwordValidationMessage, 
          passwordsMatch
        })
      }
    }

    const onConfirmationChange = (event) => {
      const newValue = event.target.value
      const passwordsMatch = isPasswordValid === true ? checkIfPasswordsMatch(password, newValue) : null         
      this.setState({
        confirmation: newValue,
        passwordsMatch
      })
    }

    const checkIfPasswordsMatch = function(password, confirmation) {
      return password.localeCompare(confirmation) === 0    
    }

    const t = this.props.t

    return (
      <div className="auth-password-control-group">
        <Form.Group controlId={controlId}>
          <Form.Label>{t('auth:signUpForm.password.label')}</Form.Label>
          <Form.Control 
            type="password"
            placeholder={t('auth:signUpForm.password.placeholder')}
            onChange={onPasswordChange}
            defaultValue={password}
            isValid={isPasswordValid === true}
            isInvalid={isPasswordValid === false}
            disabled={disabled}
            required />
          <Form.Control.Feedback type="invalid">{passwordValidationMessage}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={controlId + "Confirmation"}>
          <Form.Label>{t('auth:signUpForm.confirmation.label')}</Form.Label>
          <Form.Control 
            type="password"
            placeholder={t('auth:signUpForm.confirmation.placeholder')}
            onChange={onConfirmationChange}
            defaultValue={confirmation}
            isValid={passwordsMatch === true}
            isInvalid={passwordsMatch === false}
            disabled={disabled}
            required />
          { (passwordsMatch === false && confirmation !== "") &&
          <Form.Control.Feedback type="invalid">{t('auth:signUpForm.confirmation.feedback')}</Form.Control.Feedback>
          }
        </Form.Group>    
      </div>
    );
  }
}

export default withTranslation()(PasswordControlGroup)