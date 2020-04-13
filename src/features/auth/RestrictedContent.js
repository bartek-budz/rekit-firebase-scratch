import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { AuthSuspense } from '.';

export class RestrictedContent extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.node,
    fallback: PropTypes.node,
    children: PropTypes.node,    
  };

  render() {
    const signedIn = this.props.auth.userData != null
    return (
      <div className="auth-restricted-content">
        <AuthSuspense fallback={this.props.loader}>
          {signedIn ? this.props.children : this.props.fallback}
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
