import React, { Component } from 'react';
import { AuthDialog, LinkPreservingNext, RedirectToNext, RestrictedContent, SignInForm } from '.';
import { Trans, withTranslation } from 'react-i18next';

export class SignInPage extends Component {
  static propTypes = {
  };

  render() {
    const t = key => this.props.t('auth:signIn.'.concat(key))
    return (
      <div className="auth-sign-in-page">
        <RestrictedContent fallback={
          <AuthDialog title={t('title')} form={<SignInForm />} links={
            <div>
              <p>
                <Trans ns="auth" i18nKey="signIn.links.reset">
                  Forgot? <LinkPreservingNext to="/auth/reset-password">Reset</LinkPreservingNext>
                </Trans>
              </p> 
              <p>
                <Trans ns="auth" i18nKey="signIn.links.signUp">
                  Don't have an account? <LinkPreservingNext to="/auth/sign-up">Sign up</LinkPreservingNext>
                </Trans>
              </p>
            </div>
          }/>
        }>
          <RedirectToNext />
        </RestrictedContent>
      </div>
    );
  }
}

export default withTranslation()(SignInPage);