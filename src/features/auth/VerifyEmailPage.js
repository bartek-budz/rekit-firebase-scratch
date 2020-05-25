import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { translateErrorMessage } from './utils.js';
import { AuthSuspense, RedirectPreservingNext, RedirectToNext } from '.';
import { PageLoader, PopUp } from '../common';

export class VerifyEmailPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    code: new URLSearchParams(this.props.location.search).get('code'),
    verified: false,
  }  

  componentDidMount() {    
    this.props.actions.verifyEmail(this.state.code)    
  }

  render() {
    const {verified} = this.state 
    const {verifyEmailPending, verifyEmailError, verifyEmailSuccess, userData, email} = this.props.auth
    const {dismissVerifyEmailError, dismissVerifyEmailSuccess} = this.props.actions
        
    const signedIn = userData && userData.email && email && userData.email.localeCompare(email) === 0

    const dismissAndRediect = dismissAction => () => {      
      this.setState({verified: true})
      dismissAction()      
    }    

    const t = (key, args) => this.props.t('auth:verifyEmail.'.concat(key), args)

    return (
      <div className="auth-verify-email-page">
        <AuthSuspense fallback={<PageLoader />}>
          <PopUp
            show={verifyEmailError != null}
            title={t('error.title')}
            message={translateErrorMessage(this.props.t, verifyEmailError)}
            onClose={dismissAndRediect(dismissVerifyEmailError)}
          />

          <PopUp
            show={verifyEmailSuccess}
            title={t('success.title')}
            message={t('success.message.' + (signedIn ? 'signedIn' : 'signedOut'), {email}) }
            onClose={dismissAndRediect(dismissVerifyEmailSuccess)}
          />

          { verified && (signedIn ? <RedirectToNext /> : <RedirectPreservingNext to='/auth/sign-in' />) }
          { verifyEmailPending && <PageLoader /> }
        </AuthSuspense>
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
)(withTranslation()((withRouter(props => <VerifyEmailPage {...props}/>))));
