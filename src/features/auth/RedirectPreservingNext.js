import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { getNextURL, linkWithNext } from './utils.js';

export class RedirectPreservingNext extends Component {
  static propTypes = {
    to: PropTypes.string,    
  };

  render() {
    const {to} = this.props
    const next = getNextURL(this.props.location)

    return (
      <div className="auth-redirect-preserving-next">
        { to && <Redirect to={linkWithNext(to, next)}/> }
      </div>
    );
  }
}

export default withRouter(props => <RedirectPreservingNext {...props}/>);