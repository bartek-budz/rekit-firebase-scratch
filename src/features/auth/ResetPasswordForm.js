import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { EmailControl } from '.';

export class ResetPasswordForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const t = key => this.props.t('auth:resetPasswordForm.'.concat(key))

    return (
      <div className="auth-reset-password-form">
        <Form>
          <EmailControl controlId="email" description={t('email.description')}/>        
          <Button variant="primary" type="submit">
            {t('resetPassword')}
          </Button>
        </Form>
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
)(withTranslation()(ResetPasswordForm));
