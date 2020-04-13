import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { connect } from 'react-redux';
import { PageLoader } from '../common';
import { addAuthStateListener } from '../../common/firebase';

export class AuthLoader extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,    
    children: PropTypes.node,
  };

  state = {
    initialized: false
  }  

  componentDidMount() {
    addAuthStateListener((user) => {
      if (!this.state.initialized) {        
        this.props.actions.setState({ userData: user })}
        this.setState({ initialized: true })
    });  
  }  

  render() {
    return (
      <div className="auth-auth-loader">
        {this.state.initialized ? this.props.children : <PageLoader />}
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
)(AuthLoader);

