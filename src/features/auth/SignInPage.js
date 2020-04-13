import React, { Component } from 'react';
import { AuthDialog, AuthRedirect, SignInForm, RestrictedContent } from '.';
import { LinkPreservingQuery } from '../common'
import { Trans } from 'react-i18next';

export default class SignInPage extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="auth-sign-in-page">
        <RestrictedContent fallback={
          <AuthDialog>
            <SignInForm />
            <p className="link">
              <Trans ns="auth" i18nKey="signInForm.links.reset">
                Forgot? <LinkPreservingQuery to="/auth/reset-password">Reset</LinkPreservingQuery>
              </Trans>
            </p> 
            <p className="link">
              <Trans ns="auth" i18nKey="signInForm.links.signUp">
                Don't have an account? <LinkPreservingQuery to="/auth/sign-up">Sign up</LinkPreservingQuery>
              </Trans>
            </p>
          </AuthDialog>
        }>
          <AuthRedirect />          
        </RestrictedContent>
      </div>
    );
  }
}