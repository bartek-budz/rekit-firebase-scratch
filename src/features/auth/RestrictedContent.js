import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { isUserAuthorized } from './utils.js';
import { AuthSuspense } from '.';

export class RestrictedContent extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.node,
    fallback: PropTypes.node,    
    children: PropTypes.node,
    allowUnverified: PropTypes.bool,
  };

  render() {    
    const {loader, fallback, children} = this.props
    const allowUnverified = this.props.allowUnverified === true
    const {userData} = this.props.auth
    return (
      <div className="auth-restricted-content">
        <AuthSuspense fallback={loader}>
          {isUserAuthorized(userData, allowUnverified) ? children : fallback}
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
)(RestrictedContent);
