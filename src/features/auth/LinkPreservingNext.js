import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getNextURL, linkWithNext } from './utils.js';

export class LinkPreservingNext extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,    
    children: PropTypes.node,    
  };

  render() {
    const {to, children} = this.props
    const next = getNextURL(this.props.location)

    return (
      <div className="auth-link-preserving-next">        
        <Link to={linkWithNext(to, next)} >{children}</Link>
      </div>
    );
  }
}

export default withRouter(props => <LinkPreservingNext {...props}/>);