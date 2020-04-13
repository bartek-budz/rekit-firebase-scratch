import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

export class LinkPreservingQuery extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,    
    children: PropTypes.node,    
  };

  render() {
    const linkUrl = this.props.to.concat(this.props.location.search)
    return (
      <div className="common-link-preserving-query">
        <Link to={linkUrl}>{this.props.children}</Link>
      </div>
    );
  }
}

export default withRouter(props => <LinkPreservingQuery {...props}/>);
