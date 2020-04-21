import React, { Component } from 'react';
import { AuthDialog, LinkPreservingNext, RedirectToNext, RestrictedContent, SignUpForm } from '.';
import { Trans, withTranslation } from 'react-i18next';

export class SignUpPage extends Component {
  static propTypes = {
  };

  render() {
    const t = key => this.props.t('auth:signUp.'.concat(key))
    return (
      <div className="auth-sign-up-page">
        <RestrictedContent fallback={
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

export default withTranslation()(SignUpPage);