import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withTranslation } from 'react-i18next';
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

    const t = key => this.props.t('auth:signInForm.'.concat(key))

    return (
      <div className="auth-sign-in-form">
        <PopUp show={signInError != null} title={t('popUp.title')} message={signInError && signInError.message} onClose={dismissSignInError} />
        <Form onSubmit={onFormSubmit}>     

          <Form.Group controlId="email">
            <Form.Label>{t('email.label')}</Form.Label>
            <Form.Control 
              type="email"
              placeholder={t('email.placeholder')}
              defaultValue={email}
              disabled={locked}
              required />
            <Form.Text className="text-muted">
              {t('email.description')}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>{t('password.label')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('password.placeholder')}
              disabled={locked}
              required />
          </Form.Group>

          <Form.Group controlId="remember">
            <Form.Check 
              type="checkbox"
              label={t('remember.label')}
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
            { signInPending ? ' ' + t('signIn.pending') : t('signIn.default')}                  
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
)(withTranslation()(SignInForm));
