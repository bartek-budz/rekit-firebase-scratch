import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

export default class PopUp extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    button: PropTypes.string
  };

  render() {
    const { show, title, message, onClose, button } = this.props    
    return (
      <div className="common-pop-up">
        <Modal show={show}
          onHide={onClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>{button || "OK"}</Button>
          </Modal.Footer>
        </Modal>   
      </div>
    );
  }
}
