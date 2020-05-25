import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Button, Form, Spinner } from 'react-bootstrap';
import { EmailControl, PasswordControlGroup } from '.';
import { FakeLink, PopUp } from '../common';
import { getNextURL, isFormValid, translateErrorMessage } from './utils.js';

export class SignUpForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    allowUnverified: PropTypes.bool,
    nextIsCurrent: PropTypes.bool
  };

  state = {    
    agreement: false,
    showTermsAndConditions: false,
  }

  render() {     
    const nextURL = getNextURL(this.props.location, this.props.nextIsCurrent === true) 
    const {email, signUpPending, signUpError, signUpVerificationRequested} = this.props.auth
    const {showTermsAndConditions} = this.state
    const {signUp, dismissSignUpError, dismissSignUpVerificationRequested} = this.props.actions
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
        signUp(email, password, nextURL)
      }
      else {
        event.stopPropagation();   
      } 
    };

    const t = (key, args) => this.props.t('auth:signUp.'.concat(key), args)

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
          title={t('popUp.error.title')}
          message={translateErrorMessage(this.props.t, signUpError)}
          onClose={dismissSignUpError}
        />

        <PopUp
          show={signUpVerificationRequested}
          title={t('popUp.verificationRequested.title')}
          message={t('popUp.verificationRequested.message', {email})}
          onClose={dismissSignUpVerificationRequested}
        />   

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
            <Form.Label>&nbsp;<FakeLink onClick={onShowTermsAndConditions}>{t('agreement.link')}</FakeLink></Form.Label>
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
            { signUpPending ? ' ' + t('button.pending') : t('button.default')}
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
)(withTranslation()((withRouter(props => <SignUpForm {...props}/>))));
