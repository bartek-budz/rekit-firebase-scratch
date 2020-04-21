import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { AuthDialog, ChangePasswordForm, RedirectPreservingNext } from '.';
import { PageLoader, PopUp } from '../common';

export class ChangePasswordPage extends Component {
  static propTypes = {
  };

  state = {
    code: new URLSearchParams(this.props.location.search).get('code'),
    redirectTo: null,
  }  

  componentDidMount() {    
    this.props.actions.verifyReset(this.state.code)    
  }

  render() {    
    const {code, redirectTo} = this.state
    const {verifyResetPending, verifyResetError} = this.props.auth
    const {dismissVerifyResetError} = this.props.actions    

    const onDismissErrorPopUp = () => {      
      this.setState({redirectTo: '/auth/reset-password'})
      dismissVerifyResetError()      
    }      

    const t = this.props.t
    return (
      <div className="auth-change-password-page">

        <RedirectPreservingNext to={redirectTo}/>

        <PopUp
          show={verifyResetError != null}
          title={t('auth:verifyReset.error.title')}
          message={t('auth:verifyReset.error.message')}
          onClose={onDismissErrorPopUp}
        />

        { verifyResetPending ?
        <PageLoader />
        :
        (verifyResetError ? null : <AuthDialog title={t('auth:changePassword.title')} form={<ChangePasswordForm code={code}/>} />)
        }
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
)(withTranslation()((withRouter(props => <ChangePasswordPage {...props}/>))));