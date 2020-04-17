import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Redirect,  withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Button, Form, Spinner } from 'react-bootstrap';
import { PasswordControlGroup } from '.';
import { PopUp } from '../common';
import { getNextURL, isFormValid, linkWithNext } from './utils.js';

export class ChangePasswordForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {    
    redirectTo: null,
  }  

  render() {
    const code = new URLSearchParams(this.props.location.search).get('code');
    const nextURL = getNextURL(this.props.location)
    
    const {redirectTo} = this.state
    const {changePasswordPending, changePasswordError, changePasswordSuccess} = this.props.auth
    const {changePassword, dismissChangePasswordError, setState} = this.props.actions    

    const onFormSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget
      if (isFormValid(form)) {
        const newPassword = form.newPassword.value        
        changePassword(code, newPassword)
      }
      else {
        event.stopPropagation();   
      } 
    };
    
    const onDismissSuccessPopUp = () => {
      const redirectTo = nextURL ? linkWithNext("/auth/sign-in", nextURL) : "/auth/sign-in"
      this.setState({redirectTo})
      setState({changePasswordSuccess: false})      
    }

    const t = key => this.props.t('auth:changePassword.'.concat(key))

    return (
      <div className="auth-change-password-form">

        {redirectTo && <Redirect to={redirectTo}/>}

        <PopUp
          show={changePasswordError != null}
          title={t('popUp.error.title')}
          message={changePasswordError && changePasswordError.message}
          onClose={dismissChangePasswordError}
        />

        <PopUp
          show={changePasswordSuccess}
          title={t('popUp.success.title')}
          message={t('popUp.success.message')}
          button={t('popUp.success.button')}
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
            { changePasswordPending ? ' ' + t('submit.pending') : t('submit.default')}                  
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
)(withTranslation()((withRouter(props => <ChangePasswordForm {...props}/>))));