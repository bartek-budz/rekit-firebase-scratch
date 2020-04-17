import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link, withRouter } from 'react-router-dom';
import { RestrictedContent } from '.';
import { linkWithNext } from './utils.js';

export class AuthLink extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    to: PropTypes.string,
    children: PropTypes.node,    
  };

  render() {
    const linkPath = this.props.to
    const next = linkPath || this.props.location.pathname    
    const linkUrl = linkWithNext("/auth/sign-in", next)

    return (
      <div className="auth-auth-link">
        <RestrictedContent loader={this.props.children} fallback={<Link to={linkUrl}>{this.props.children}</Link>}>
          { linkPath ? <Link to={linkPath}>{this.props.children}</Link> : this.props.children}          
        </RestrictedContent>
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
)(withRouter(props => <AuthLink {...props}/>));
