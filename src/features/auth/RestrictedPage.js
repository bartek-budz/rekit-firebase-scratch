import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Trans, withTranslation } from 'react-i18next';
import { AuthDialog, SignInForm, SignUpForm, ResetPasswordForm, RestrictedContent } from '.';
import { FakeLink, PageLoader } from '../common';

const SCREEN_SIGN_IN = 'singIn'
const SCREEN_SING_UP = 'signUp'
const SCREEN_RESET_PASSWORD = 'resetPassword'

export class RestrictedPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.node,    
  };

  state = {
    currentScreen: SCREEN_SIGN_IN
  }  

  render() {
    const localState = this.state
    const globalState = this.props.auth
    const userData = globalState.userData
    const signedIn = userData != null
    const currentScreen = signedIn ? null : localState.currentScreen

    const switchScreen = screenId => event => {
      event.preventDefault()
      this.setState({currentScreen: screenId})
    }

    const t = key => this.props.t('auth:'.concat(key))    

    const renderAuthDialog = () => {
      switch (currentScreen) {
        case SCREEN_SIGN_IN:
          return (
            <AuthDialog title={t('signInForm.title')} form={<SignInForm />} links={
              <div>
                <p>
                  <Trans ns="auth" i18nKey="signInForm.links.reset">
                    Forgot? <FakeLink onClick={switchScreen(SCREEN_RESET_PASSWORD)}>Reset</FakeLink>
                  </Trans>
                </p> 
                <p>
                  <Trans ns="auth" i18nKey="signInForm.links.signUp">
                    Don't have an account? <FakeLink onClick={switchScreen(SCREEN_SING_UP)}>Sign up</FakeLink>
                  </Trans>
                </p>
              </div>
            }/>
          );
        case SCREEN_SING_UP:
          return (
            <AuthDialog title={t('signUpForm.title')} form={<SignUpForm />} links={
              <p>
                <Trans ns="auth" i18nKey="signUpForm.links.signIn">
                  Registered? <FakeLink onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</FakeLink>
                </Trans>
              </p>    
            }/>           
          );
        case SCREEN_RESET_PASSWORD:
          return (
            <AuthDialog title={t('resetPasswordForm.title')} form={<ResetPasswordForm />} links={
              <div>
                <p>
                  <Trans ns="auth" i18nKey="resetPasswordForm.links.signIn">
                    Remember? <FakeLink onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</FakeLink>
                  </Trans>
                </p>    
                <p>
                  <Trans ns="auth" i18nKey="resetPasswordForm.links.signUp">
                    Unregisterd? <FakeLink onClick={switchScreen(SCREEN_SING_UP)}>Sign up</FakeLink>
                  </Trans>
                </p>                
              </div>
            }/>
          );
        default:
          return null;
      }
    }

    return (
      <div className="auth-restricted-page">
        <RestrictedContent loader={<PageLoader />} fallback={renderAuthDialog()}>
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
