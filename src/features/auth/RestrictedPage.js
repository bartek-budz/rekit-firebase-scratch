import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { AuthDialog, SignInForm, SignUpForm, ResetPasswordForm, RestrictedContent } from '.';
import { PageLoader } from '../common';
import { Trans, withTranslation } from 'react-i18next';

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

    const fakeLink = function(screenId) {
      return "#".concat(screenId)
    }

    const switchScreen = screenId => event => {
      event.preventDefault()
      this.setState({currentScreen: screenId})
    }

    const renderAuthDialog = () => {
      switch (currentScreen) {
        case SCREEN_SIGN_IN:
          return (
            <AuthDialog>
              <SignInForm />
              <p className="link">
                <Trans ns="auth" i18nKey="signInForm.links.reset">
                  Forgot? <a href={fakeLink(SCREEN_RESET_PASSWORD)} onClick={switchScreen(SCREEN_RESET_PASSWORD)}>Reset</a>
                </Trans>
              </p> 
              <p className="link">
                <Trans ns="auth" i18nKey="signInForm.links.signUp">
                  Don't have an account? <a href={fakeLink(SCREEN_SING_UP)} onClick={switchScreen(SCREEN_SING_UP)}>Sign up</a>
                </Trans>
              </p>
            </AuthDialog>
          );
        case SCREEN_SING_UP:
          return (
            <AuthDialog>
              <SignUpForm />
              <p className="link">
                <Trans ns="auth" i18nKey="signUpForm.links.signIn">
                  Registered? <a href={fakeLink(SCREEN_SIGN_IN)} onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</a>
                </Trans>
              </p>                     
            </AuthDialog>            
          );
        case SCREEN_RESET_PASSWORD:
          return (
            <AuthDialog>
              <ResetPasswordForm />
              <p className="link">
                <Trans ns="auth" i18nKey="resetPasswordForm.links.signIn">
                  Remember? <a href={fakeLink(SCREEN_SIGN_IN)} onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</a>
                </Trans>
              </p>    
              <p className="link">
                <Trans ns="auth" i18nKey="resetPasswordForm.links.signUp">
                  Unregisterd? <a href={fakeLink(SCREEN_SING_UP)} onClick={switchScreen(SCREEN_SING_UP)}>Sign up</a>
                </Trans>
              </p>                             
            </AuthDialog>
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
