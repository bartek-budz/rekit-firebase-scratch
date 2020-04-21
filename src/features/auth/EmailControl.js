import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from './redux/actions';
import { Form } from 'react-bootstrap';
import { isValidEmail, } from './utils.js';

export class EmailControl extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    controlId: PropTypes.string,    
    disabled: PropTypes.bool,
    description: PropTypes.string,
  };

  state = {
    email: this.props.auth.email,
  }  

  render() {
    const { controlId, disabled, description } = this.props
    const t = key => this.props.t('auth:email.' + key)

    const onEmailChange = (event) => {
      const email = event.target.value
      const isEmailValid = isValidEmail(email)
      this.setState({email, isEmailValid})
      this.props.actions.setState({email})
    }    

    return (
      <div className="auth-email-control">
        <Form.Group controlId={controlId}>
          <Form.Label>{t('label')}</Form.Label>
          <Form.Control 
            type="email"
            placeholder={t('placeholder')}
            defaultValue={this.state.email}
            onChange={onEmailChange}                    
            isValid={this.state.isEmailValid === true}
            isInvalid={this.state.isEmailValid === false}
            disabled={disabled}
            required/>                  
          {this.state.isEmailValid === false &&
          <Form.Control.Feedback type="invalid">{t('feedback')}</Form.Control.Feedback>
          }
          {description != null && 
          <Form.Text className="text-muted">
            {description}
          </Form.Text>
          }          
        </Form.Group>
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
)(withTranslation()(EmailControl));
