import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withTranslation } from 'react-i18next';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { RestrictedContent } from '.';
import { FakeLink, PopUp } from '../common';
import { linkWithNext, translateErrorMessage } from './utils.js';

export class AuthLink extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    to: PropTypes.string,
    signOut: PropTypes.bool,
    children: PropTypes.node,
    loader: PropTypes.node,
    fallback: PropTypes.node,
    pending: PropTypes.node
  };

  state = {   
    signOutInitialized: false,
  }  

  render() {
    const {signOutInitialized} = this.state        
    const linkTarget = this.props.to
    const linkText = this.props.children

    const isSignOutLink = this.props.signOut
    const {signOutPending, signOutError} = this.props.auth
    const {signOut, dismissSignOutError} = this.props.actions    

    const loader = this.props.loader || linkText
    const fallback = this.props.fallback || linkText
    const pending = this.props.pending || linkText    

    const currentLocation = this.props.location.pathname
    const nextAfterSignIn = linkTarget || currentLocation

    const onSignOutClick = () => {
      this.setState({signOutInitialized: true})
      signOut()
    }

    const signOutSuccess = signOutInitialized && !(signOutPending || signOutError)
    const t = this.props.t

    return (
      <div className="auth-auth-link">
        { isSignOutLink ?
        <div>
          { signOutSuccess && linkTarget && <Redirect to={linkTarget} />}
          <PopUp show={signOutError != null} title={t('auth:signOut.popUp.title')} message={translateErrorMessage(t, signOutError)} onClose={dismissSignOutError} />
          <RestrictedContent allowUnverified loader={loader} fallback={fallback}>
            { signOutPending ? pending : (<FakeLink onClick={onSignOutClick}>{linkText}</FakeLink>) }
          </RestrictedContent>          
        </div>
        :               
        <RestrictedContent allowUnverified loader={loader} fallback={<Link to={linkWithNext("/auth/sign-in", nextAfterSignIn)}>{linkText}</Link>}>
          { linkTarget ? <Link to={linkTarget}>{linkText}</Link> : linkText}          
        </RestrictedContent>
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
)(withTranslation()((withRouter(props => <AuthLink {...props}/>))));
