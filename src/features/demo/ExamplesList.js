import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ExamplesList extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="demo-examples-list">
        <h3>Custom components demo:</h3>
        <ul>
          <li><Link to="/demo/restricted-page">RestrictedPage</Link> replaces its content with authentication dialog for unauthenticated users</li>
          <li><Link to="/demo/restricted-content">RestrictedContent</Link> displays its content only to authenticated users</li>
          <li><Link to="/demo/auth-link">AuthLink</Link> ensures user is signed in (or out) before redirecting to the target path</li>
          <li><Link to="/demo/language-button">LanguageButton</Link> allows for dynamic change of the app language</li>
        </ul>
      </div>
    );
  }
}
