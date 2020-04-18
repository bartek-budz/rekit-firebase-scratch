import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Redirect, withRouter } from 'react-router-dom';
import { QUERY_PARAM_NEXT_URL } from './utils.js';
import { APP_BASE_URL } from '../../common/env.js';
import { QUERY_PARAM_LANG } from '../../common/i18n.js';
import { PageNotFound } from '../common';

export class EmailActionHandlerPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {    
    const params = new URLSearchParams(this.props.location.search);
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');
    const apiKey = params.get('apiKey');
    const continueUrl = params.get('continueUrl')
    const optionalNextUrlQuery = continueUrl ? `&${QUERY_PARAM_NEXT_URL}=${continueUrl.replace(APP_BASE_URL, "")}` : "";
    const languageCode = params.get('lang');
    return (
      <div className="auth-email-action-handler-page">
        {(function() {
          switch (mode) {
            case 'resetPassword':
              return <Redirect to={{
                        pathname: "/auth/change-password",
                        search: `?${QUERY_PARAM_LANG}=${languageCode}&code=${oobCode}${optionalNextUrlQuery}`,
                        state: {}
                      }}/>;
            case 'recoverEmail':
            case 'verifyEmail':
            default:
              return <PageNotFound />;
          }
        })()}        
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
)(withRouter(props => <EmailActionHandlerPage {...props}/>));
