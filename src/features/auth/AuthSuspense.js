import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { connect } from 'react-redux';
import { addAuthStateListener } from '../../common/firebase';

export class AuthSuspense extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    fallback: PropTypes.object,
    children: PropTypes.node,
  };

  state = {
    initialized: this.props.auth.userData !== undefined
  }  

  componentDidMount() {
    if (!this.state.initialized) {
      addAuthStateListener((user) => {
        if (this.props.auth.userData === undefined) {        
          this.props.actions.setState({ userData: user })
        }
        if (!this.state.initialized) {
          this.setState({ initialized: true })
        }
      }); 
    } 
  } 

  render() {
    return (
      <div className="auth-auth-suspense">
        {this.state.initialized ? this.props.children : this.props.fallback}
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
)(AuthSuspense);

