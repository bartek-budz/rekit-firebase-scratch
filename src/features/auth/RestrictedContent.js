import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { AuthDialog, AuthLoader, SignInForm, SignUpForm, ResetPasswordForm } from '.';
import { Trans, withTranslation } from 'react-i18next';

const SCREEN_SIGN_IN = 'singIn'
const SCREEN_SING_UP = 'signUp'
const SCREEN_RESET_PASSWORD = 'resetPassword'

export class RestrictedContent extends Component {
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

    const linkToScreen = function(screenId) {
      return "#".concat(screenId)
    }

    const switchScreen = screenId => () => {
      this.setState({currentScreen: screenId})
    }

    return (
      <div className="auth-restricted-content">
        <AuthLoader>
          {currentScreen === SCREEN_SIGN_IN &&
          <AuthDialog>
            <SignInForm />
            <p className="link">
              <Trans ns="auth" i18nKey="signInForm.links.reset">
                Forgot? <a href={linkToScreen(SCREEN_RESET_PASSWORD)} onClick={switchScreen(SCREEN_RESET_PASSWORD)}>Reset</a>
              </Trans>
            </p> 
            <p className="link">
              <Trans ns="auth" i18nKey="signInForm.links.signUp">
                Don't have an account? <a href={linkToScreen(SCREEN_SING_UP)} onClick={switchScreen(SCREEN_SING_UP)}>Sign up</a>
              </Trans>
            </p>
          </AuthDialog>
          }      
          {currentScreen === SCREEN_SING_UP &&
          <AuthDialog>
            <SignUpForm />
            <p className="link">
              <Trans ns="auth" i18nKey="signUpForm.links.signIn">
                Registered? <a href={linkToScreen(SCREEN_SIGN_IN)} onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</a>
              </Trans>
            </p>                     
          </AuthDialog>
          }
          {currentScreen === SCREEN_RESET_PASSWORD &&
          <AuthDialog>
            <ResetPasswordForm />
            <p className="link">
              <Trans ns="auth" i18nKey="resetPasswordForm.links.signIn">
                Remember? <a href={linkToScreen(SCREEN_SIGN_IN)} onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</a>
              </Trans>
            </p>    
            <p className="link">
              <Trans ns="auth" i18nKey="resetPasswordForm.links.signUp">
                Unregisterd? <a href={linkToScreen(SCREEN_SING_UP)} onClick={switchScreen(SCREEN_SING_UP)}>Sign up</a>
              </Trans>
            </p>                             
          </AuthDialog>
          }
          {signedIn && this.props.children}
        </AuthLoader>
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
)(withTranslation()(RestrictedContent));
