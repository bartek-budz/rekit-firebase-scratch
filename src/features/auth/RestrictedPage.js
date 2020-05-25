import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Trans, withTranslation } from 'react-i18next';
import { isUserAuthorized } from './utils.js';
import { Alert } from 'react-bootstrap';
import { AuthDialog, SignInForm, SignOutButton, SignUpForm, ResetPasswordForm, RestrictedContent } from '.';
import { FakeLink, PageLoader } from '../common';

const SCREEN_SIGN_IN = 'singIn'
const SCREEN_SING_UP = 'signUp'
const SCREEN_RESET_PASSWORD = 'resetPassword'

export class RestrictedPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.node,
    children: PropTypes.node,
    allowUnverified: PropTypes.bool,
  };

  state = {
    currentScreen: SCREEN_SIGN_IN
  }  

  render() {
    const localState = this.state
    const globalState = this.props.auth
    const {userData, signUpVerificationRequested} = globalState
    const allowUnverified = this.props.allowUnverified === true
    const unverified = userData && !isUserAuthorized(userData, allowUnverified)
    const currentScreen = unverified ? null : localState.currentScreen

    const switchScreen = screenId => event => {      
      this.setState({currentScreen: screenId})
    }

    const t = (key, args) => this.props.t('auth:'.concat(key), args)    

    const renderAuthDialog = () => {
      switch (currentScreen) {
        case SCREEN_SIGN_IN:
          return (
            <AuthDialog title={t('signIn.title')} form={<SignInForm />} links={
              <div>
                <p>
                  <Trans ns="auth" i18nKey="signIn.links.reset">
                    Forgot? <FakeLink onClick={switchScreen(SCREEN_RESET_PASSWORD)}>Reset</FakeLink>
                  </Trans>
                </p> 
                <p>
                  <Trans ns="auth" i18nKey="signIn.links.signUp">
                    Don't have an account? <FakeLink onClick={switchScreen(SCREEN_SING_UP)}>Sign up</FakeLink>
                  </Trans>
                </p>
              </div>
            }/>
          );
        case SCREEN_SING_UP:
          return (
            <AuthDialog title={t('signUp.title')} form={<SignUpForm nextIsCurrent/>} links={
              <p>
                <Trans ns="auth" i18nKey="signUp.links.signIn">
                  Registered? <FakeLink onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</FakeLink>
                </Trans>
              </p>    
            }/>           
          );
        case SCREEN_RESET_PASSWORD:
          return (
            <AuthDialog title={t('resetPassword.title')} form={<ResetPasswordForm nextIsCurrent/>} links={
              <div>
                <p>
                  <Trans ns="auth" i18nKey="resetPassword.links.signIn">
                    Remember? <FakeLink onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</FakeLink>
                  </Trans>
                </p>    
                <p>
                  <Trans ns="auth" i18nKey="resetPassword.links.signUp">
                    Unregisterd? <FakeLink onClick={switchScreen(SCREEN_SING_UP)}>Sign up</FakeLink>
                  </Trans>
                </p>                
              </div>
            }/>
          );
        default:
          return (
            <Alert variant="warning">
              <Alert.Heading>{t('verificationRequired.title')}</Alert.Heading>
              <p>{t('verificationRequired.message', {email: userData && userData.email})}</p>
              <hr />
              <SignOutButton variant="outline-warning" />              
            </Alert>
          );          
      }
    }

    return (
      <div className="auth-restricted-page">
        <RestrictedContent allowUnverified={allowUnverified && !signUpVerificationRequested} loader={this.props.loader || <PageLoader />} fallback={renderAuthDialog()}>
          {this.props.children}
        </RestrictedContent>
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
)(withTranslation()(RestrictedPage));
