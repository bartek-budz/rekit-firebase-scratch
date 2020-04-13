import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import { AuthLink } from '../auth';

export class ExamplesIndex extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="examples-examples-index">
        <h3>Scratch component examples:</h3>
        <ul>
          <li><Link to="/examples/restricted-page">RestrictedPage</Link> displays sign in form instead of its content for unauthenticated users</li>
          <li><Link to="/examples/restricted-content">RestrictedContent</Link> allows to restrict part of a page to authenticated users</li>
          <li><AuthLink to="/examples/restricted-page">AuthLink</AuthLink> redirects unauthenticated user to sign in form, authenticated to target path</li>
          <li><Link to="/examples/language-button">LanguageButton</Link> allows for dynamic change of the app language</li>
        </ul>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    examples: state.examples,
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
)(ExamplesIndex);
