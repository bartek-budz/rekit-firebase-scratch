import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withTranslation } from 'react-i18next';
import { Button, Form, Spinner } from 'react-bootstrap';
import { EmailControl, PasswordControlGroup } from '.';
import { PopUp } from '../common';
import { isFormValid } from './utils.js';

export class SignUpForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {    
    agreement: false,
    showTermsAndConditions: false,
  }

  render() {     
    const {email, signUpPending, signUpError} = this.props.auth
    const {showTermsAndConditions} = this.state
    const {signUp, dismissSignUpError} = this.props.actions
    const locked = signUpPending    

    const onShowTermsAndConditions = (event) => {
      event.preventDefault()
      this.setState({showTermsAndConditions: true})
    }

    const onSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget
      if (isFormValid(form)) {
        const password = form.password.value            
        signUp(email, password)
      }
      else {
        event.stopPropagation();   
      } 
    };    

    const t = key => this.props.t('auth:signUpForm.'.concat(key))

    return (
      <div className="auth-sign-up-form">
        <PopUp 
          show={showTermsAndConditions}
          title={t('popUp.termsAndConditions.title')}
          message={t('popUp.termsAndConditions.message')}
          onClose={() => this.setState({showTermsAndConditions: false})}
        />  
        <PopUp
          show={signUpError != null}
          title={t('popUp.signUpError.title')}
          message={signUpError && signUpError.message}
          onClose={dismissSignUpError} />
        <Form onSubmit={onSubmit}>

          <EmailControl controlId="email" disabled={locked}/>

          <PasswordControlGroup
            controlId="password"
            onChange={password => this.setState({password})}
            disabled={locked}
          />

          <Form.Group controlId="agreement">
            <Form.Check required
              label={t('agreement.label')}
              feedback={t('agreement.feedback')}
              style={{display: 'inline'}}
              disabled={locked}
            />
            <Form.Label>&nbsp;<a href="#termsAndConditions" onClick={onShowTermsAndConditions}>{t('agreement.link')}</a></Form.Label>
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
            { signUpPending ? ' ' + t('signUp.pending') : t('signUp.default')}                  
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
