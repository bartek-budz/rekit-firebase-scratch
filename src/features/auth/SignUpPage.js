import React, { Component } from 'react';
import { AuthDialog, AuthRedirect, SignUpForm, RestrictedContent } from '.';
import { LinkPreservingQuery } from '../common'
import { Trans, withTranslation } from 'react-i18next';

export class SignUpPage extends Component {
  static propTypes = {
  };

  render() {
    const t = key => this.props.t('auth:signUpForm.'.concat(key))    
    return (
      <div className="auth-sign-up-page">
        <RestrictedContent fallback={
          <AuthDialog title={t('title')} form={<SignUpForm />} links={
            <p>
              <Trans ns="auth" i18nKey="signUpForm.links.signIn">
                Registered? <LinkPreservingQuery to="/auth/sign-in">Sign in</LinkPreservingQuery>
              </Trans>            
            </p>
          }/>
        }>
          <AuthRedirect />
        </RestrictedContent>
      </div>
    );
  }
}

export default withTranslation()(SignUpPage);