import React, { Component } from 'react';
import { AuthDialog, AuthSuspense, LinkPreservingNext, ResetPasswordForm } from '.';
import { Trans, withTranslation } from 'react-i18next';

export class ResetPasswordPage extends Component {
  static propTypes = {
  };

  render() {
    const t = key => this.props.t('auth:resetPassword.'.concat(key))
    return (
      <div className="auth-reset-password-page">
        <AuthSuspense>
          <AuthDialog title={t('title')} form={<ResetPasswordForm />} links={
            <div>
              <p>
                <Trans ns="auth" i18nKey="resetPassword.links.signIn">
                  Remember? <LinkPreservingNext to="/auth/sign-in">Sign in</LinkPreservingNext>
                </Trans>
              </p>
              <p>                          
                <Trans ns="auth" i18nKey="resetPassword.links.signUp">
                  Unregisterd? <LinkPreservingNext to="/auth/sign-up">Sign up</LinkPreservingNext>
                </Trans>
              </p>
            </div>  
          }/>
        </AuthSuspense>
      </div>
    );
  }
}

export default withTranslation()(ResetPasswordPage);