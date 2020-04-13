import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Redirect, withRouter } from 'react-router-dom';

export class AuthRedirect extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };


  render() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const next = params.get('next');

    return (
      <div className="auth-auth-redirect">
        {next && <Redirect to={next} />}
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

