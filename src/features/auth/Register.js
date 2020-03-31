import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import {Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { isValidEmail, validatePassword, getPasswordValidationMessage } from './utils.js';

export class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    email: this.props.auth.email,
    password: '',
    confirmation: '',
    agreement: false,
  }

  onEmailChange = (event) => {
    const email = event.target.value
    const isEmailValid = isValidEmail(email)
    const emailValidationMessage = isEmailValid ? null : 'Enter a valid e-mail address!'
    this.setState({email, isEmailValid, emailValidationMessage})
    this.props.actions.setGlobalState({email})
  }

  onPasswordChange = (event) => {
    const password = event.target.value
    const validationResult = validatePassword(password)    
    const isPasswordValid = validationResult.valid
    const passwordValidationMessage = isPasswordValid ? null : getPasswordValidationMessage(validationResult)
    this.setState({password, isPasswordValid, passwordValidationMessage})
  }

  onConfirmationChange = (event) => {
    const confirmation = event.target.value
    const isConfirmationValid = this.state.password.localeCompare(confirmation) === 0    
    const confirmationValidationMessage = isConfirmationValid ? null : 'Passwords don\'t mach'
    this.setState({confirmation, isConfirmationValid, confirmationValidationMessage})
  }  

  onSubmit = (event) => {
    const form = event.currentTarget;
    const valid = form.checkValidity()
    if (valid === false) {

    }
    console.debug(this.state)
    event.preventDefault();
    event.stopPropagation();    
  };

  onModalClose = (event) => {
    this.setState({showTermsAndConsitions: false})
  }

  render() {  
    return (
      <div className="auth-register">
        <Modal show={this.state.showTermsAndConsitions === true} onHide={this.onModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Terms and conditions</Modal.Title>
          </Modal.Header>
          <Modal.Body>TBD</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.onModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>        
        <Container>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>

                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    defaultValue={this.state.email}
                    onChange={this.onEmailChange}                    
                    isValid={this.state.isEmailValid === true}
                    isInvalid={this.state.isEmailValid === false}
                    required/>                  
                  <Form.Control.Feedback type="invalid">{this.state.emailValidationMessage}</Form.Control.Feedback>      
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password"
                    placeholder="Enter password"
                    onChange={this.onPasswordChange}
                    defaultValue={this.state.password}
                    isValid={this.state.isPasswordValid === true}
                    isInvalid={this.state.isPasswordValid === false}
                    required />
                  <Form.Control.Feedback type="invalid">{this.state.passwordValidationMessage}</Form.Control.Feedback>                          
                </Form.Group> 

                <Form.Group controlId="confirmation">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control 
                    type="password"
                    placeholder="Enter password"
                    onChange={this.onConfirmationChange}
                    defaultValue={this.state.confirmation}
                    isValid={this.state.isConfirmationValid === true}
                    isInvalid={this.state.isConfirmationValid === false}
                    required />
                  <Form.Control.Feedback type="invalid">{this.state.confirmationValidationMessage}</Form.Control.Feedback>                          
                </Form.Group>                 

                <Form.Group>
                  <Form.Check required label="Agree to" feedback="You must agree before submitting." style={{display: 'inline'}}/>
                  <Form.Label>&nbsp;<a href="#showModal" onClick={() => this.setState({showTermsAndConsitions: true})}>terms and conditions</a></Form.Label>
                </Form.Group>                             
                <Button variant="primary" type="submit">
                  Sign up
                </Button>
              </Form>
              <p>Already have an account? <Link to="/auth/login">Sign in</Link></p>
            </Col>
          </Row>
        </Container>       
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
)(Register);
