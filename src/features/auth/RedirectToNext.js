import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { getNextURL } from './utils.js';

export class RedirectToNext extends Component {
  static propTypes = {
  };

  render() {    
    const nextURL = getNextURL(this.props.location)

    return (
      <div className="auth-redirect-to-next">
        <Redirect to={nextURL || "/"} />
      </div>
    );
  }
}


export default withRouter(props => <RedirectToNext {...props}/>);

