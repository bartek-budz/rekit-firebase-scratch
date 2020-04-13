import React, { Component } from 'react';
import { AuthDialog, AuthSuspense, ResetPasswordForm } from '.';
import { LinkPreservingQuery } from '../common'
import { Trans } from 'react-i18next';

export default class ResetPasswordPage extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="auth-reset-password-page">
        <AuthSuspense>
          <AuthDialog>
            <ResetPasswordForm />
            <p className="link">
              <Trans ns="auth" i18nKey="resetPasswordForm.links.signIn">
                Remember? <LinkPreservingQuery to="/auth/sign-in">Sign in</LinkPreservingQuery>
              </Trans>
            </p>    
            <p className="link">
              <Trans ns="auth" i18nKey="resetPasswordForm.links.signUp">
                Unregisterd? <LinkPreservingQuery to="/auth/sign-up">Sign up</LinkPreservingQuery>
              </Trans>
            </p>                             
          </AuthDialog>
        </AuthSuspense>
      </div>
    );
  }
}
