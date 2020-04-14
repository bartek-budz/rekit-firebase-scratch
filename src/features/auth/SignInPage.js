import React, { Component } from 'react';
import { AuthDialog, AuthRedirect, SignInForm, RestrictedContent } from '.';
import { LinkPreservingQuery } from '../common'
import { Trans, withTranslation } from 'react-i18next';

export class SignInPage extends Component {
  static propTypes = {
  };

  render() {
    const t = key => this.props.t('auth:signInForm.'.concat(key))
    return (
      <div className="auth-sign-in-page">
        <RestrictedContent fallback={
          <AuthDialog title={t('title')} form={<SignInForm />} links={
            <div>
              <p>
                <Trans ns="auth" i18nKey="signInForm.links.reset">
                  Forgot? <LinkPreservingQuery to="/auth/reset-password">Reset</LinkPreservingQuery>
                </Trans>
              </p> 
              <p>
                <Trans ns="auth" i18nKey="signInForm.links.signUp">
                  Don't have an account? <LinkPreservingQuery to="/auth/sign-up">Sign up</LinkPreservingQuery>
                </Trans>
              </p>
            </div>
          }/>
        }>
          <AuthRedirect />
        </RestrictedContent>
      </div>
    );
  }
}

export default withTranslation()(SignInPage);