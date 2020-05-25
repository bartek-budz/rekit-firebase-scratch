import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Trans, withTranslation } from 'react-i18next';
import { AuthDialog, LinkPreservingNext, RedirectToNext, RestrictedContent, SignUpForm } from '.';

export class SignUpPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,    
  };

  render() {
    const {signUpVerificationRequested} = this.props.auth
    const t = (key, args) => this.props.t('auth:signUp.'.concat(key), args)

    return (
      <div className="auth-sign-up-page">
        <RestrictedContent allowUnverified={!signUpVerificationRequested} fallback={
          <AuthDialog title={t('title')} form={<SignUpForm />} links={
            <p>
              <Trans ns="auth" i18nKey="signUp.links.signIn">
                Registered? <LinkPreservingNext to="/auth/sign-in">Sign in</LinkPreservingNext>
              </Trans>            
            </p>
          }/>
        }>
          <RedirectToNext />
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
)(withTranslation()(SignUpPage));