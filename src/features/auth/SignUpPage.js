import React, { Component } from 'react';
import { AuthDialog, AuthRedirect, SignUpForm, RestrictedContent } from '.';
import { LinkPreservingQuery } from '../common'
import { Trans } from 'react-i18next';

export default class SignUpPage extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="auth-sign-up-page">
        <RestrictedContent fallback={
          <AuthDialog>
            <SignUpForm />
            <p className="link">
              <Trans ns="auth" i18nKey="signUpForm.links.signIn">
                Registered? <LinkPreservingQuery to="/auth/sign-in">Sign in</LinkPreservingQuery>
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
