import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {  withTranslation } from 'react-i18next';
import { Button, Form, Spinner } from 'react-bootstrap';
import { PasswordControlGroup, RedirectToNext } from '.';
import { PopUp } from '../common';
import { isFormValid, translateErrorMessage } from './utils.js';

export class ChangePasswordForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    code: PropTypes.string.isRequired,    
  };

  state = {    
    redirectToNext: false,
  }  

  render() {
    const {code} = this.props
    const {redirectToNext} = this.state
    const {email, changePasswordPending, changePasswordError, changePasswordSuccess} = this.props.auth
    const {changePassword, dismissChangePasswordError, setState} = this.props.actions    

    const onFormSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget
      if (isFormValid(form)) {
        const newPassword = form.newPassword.value         
        changePassword(email, newPassword, code)
      }
      else {
        event.stopPropagation();   
      } 
    };
    
    const onDismissSuccessPopUp = () => {      
      this.setState({redirectToNext: true})
      setState({changePasswordSuccess: false})      
    }

    const t = (key, args) => this.props.t('auth:changePassword.'.concat(key), args)

    return (
      <div className="auth-change-password-form">
        
        {redirectToNext && <RedirectToNext />}        

        <p>{t('description', {email})}</p>

        <PopUp
          show={changePasswordError != null}
          title={t('popUp.error.title')}
          message={translateErrorMessage(this.props.t, changePasswordError)}
          onClose={dismissChangePasswordError}
        />

        <PopUp
          show={changePasswordSuccess}
          title={t('popUp.success.title')}
          message={t('popUp.success.message')}          
          onClose={onDismissSuccessPopUp}
        />

        <Form onSubmit={onFormSubmit}>

          <PasswordControlGroup controlId="newPassword" disabled={changePasswordPending} />

          <Button variant="primary" type="submit" disabled={changePasswordPending}>
            {changePasswordPending &&
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            }
            { changePasswordPending ? ' ' + t('button.pending') : t('button.default')}
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
)(withTranslation()(ChangePasswordForm));