import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { SignInForm, SignUpForm, ResetPasswordForm } from '.';

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
        {currentScreen === SCREEN_SIGN_IN &&
        <div className="screen-center">
          <SignInForm />
          <p>Forgot password? <a href={linkToScreen(SCREEN_RESET_PASSWORD)} onClick={switchScreen(SCREEN_RESET_PASSWORD)}>Reset</a></p>
          <p>Don't have an account? <a href={linkToScreen(SCREEN_SING_UP)} onClick={switchScreen(SCREEN_SING_UP)}>Sign up</a></p>        
        </div>
        }      
        {currentScreen === SCREEN_SING_UP &&
        <div className="screen-center">
          <SignUpForm />
          <p>Already have an account? <a href={linkToScreen(SCREEN_SIGN_IN)} onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</a></p>        
        </div>
        }
        {currentScreen === SCREEN_RESET_PASSWORD &&
        <div className="screen-center">
          <ResetPasswordForm />
          <p>Remember password? <a href={linkToScreen(SCREEN_RESET_PASSWORD)} onClick={switchScreen(SCREEN_SIGN_IN)}>Sign in</a></p>
          <p>Don't have an account? <a href={linkToScreen(SCREEN_SING_UP)} onClick={switchScreen(SCREEN_SING_UP)}>Sign up</a></p>        
        </div>
        }
        {signedIn && this.props.children}    
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
)(RestrictedContent);
