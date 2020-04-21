import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import { EmailControl, RedirectPreservingNext } from '.';
import { PopUp } from '../common';
import { getNextURL } from './utils.js';

export class ResetPasswordForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    redirectTo: null,
  }  

  render() {
    const email = this.props.auth.email
    const {resetPasswordPending, resetPasswordError, resetPasswordSuccess} = this.props.auth
    const {resetPassword, dismissResetPasswordError, setState} = this.props.actions        
    const {redirectTo} = this.state
    const nextURL = getNextURL(this.props.location)

    const onFormSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget
      if (form.checkValidity()) {
        resetPassword(email, nextURL)
      }
      else {
        event.stopPropagation();   
      }
    };

    const onDismissSuccessPopUp = () => {
      this.setState({redirectTo: '/auth/sign-in'})
      setState({resetPasswordSuccess: false})      
    }

    const translationPrefix = 'auth:resetPassword.'
    const t = key => this.props.t(translationPrefix.concat(key))

    return (
      <div className="auth-reset-password-form">

        <RedirectPreservingNext to={redirectTo} />

        <PopUp 
          show={resetPasswordError != null} 
          title={t('popUp.error.title')}
          message={resetPasswordError && resetPasswordError.message}
          onClose={dismissResetPasswordError}
        />
        
        <PopUp
          show={resetPasswordSuccess}
          title={t('popUp.success.title')}
          message={this.props.t(translationPrefix.concat('popUp.success.message'), {email})}
          button={t('popUp.success.button')}
          onClose={onDismissSuccessPopUp}
        />
        
        <Form onSubmit={onFormSubmit}>
          <EmailControl controlId="email" description={t('email.description')} disabled={resetPasswordPending}/>
          <Button variant="primary" type="submit" disabled={resetPasswordPending}>
            {resetPasswordPending &&
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            }
            { resetPasswordPending ? ' ' + t('button.pending') : t('button.default')}
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
)(withTranslation()(withRouter(props => <ResetPasswordForm {...props}/>)));