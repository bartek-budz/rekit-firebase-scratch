import React, { Component } from 'react';
import { AuthDialog, ChangePasswordForm } from '.';
import { withTranslation } from 'react-i18next';

export class ChangePasswordPage extends Component {
  static propTypes = {
  };

  render() {    
    const t = this.props.t
    return (
      <div className="auth-change-password-page">
        <AuthDialog title={t('auth:changePassword.title')} form={<ChangePasswordForm />} />
      </div>
    );
  }
}

export default withTranslation()(ChangePasswordPage);