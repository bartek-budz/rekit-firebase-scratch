import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Spinner } from 'react-bootstrap';
import { PopUp } from '../common';

export class SignOutButton extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const {signOutPending, signOutError} = this.props.auth
    const {signOut, dismissSignOutError} = this.props.actions 

    return (
      <div className="auth-sign-out-button">
        <PopUp show={signOutError != null} title="Sign out failed" message={signOutError && signOutError.message} onClose={dismissSignOutError} />          
        <Button variant="primary" type="button" size="sm" disabled={signOutPending} onClick={signOut}>
          {signOutPending &&
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          }
          { signOutPending ? ' Signing out...' : 'Sign out'}                  
        </Button> 
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
)(SignOutButton);
