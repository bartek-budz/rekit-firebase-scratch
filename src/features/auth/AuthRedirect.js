import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Redirect, withRouter } from 'react-router-dom';
import { getNextURL } from './utils.js';

export class AuthRedirect extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };


  render() {    
    const nextURL = getNextURL(this.props.location)

    return (
      <div className="auth-auth-redirect">
        <Redirect to={nextURL || "/"} />
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
)(withRouter(props => <AuthRedirect {...props}/>));

