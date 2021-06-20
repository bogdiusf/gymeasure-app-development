import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

export default function ConfirmationModal(props) {

    return (
        <Modal show={props.confirmationModal} onHide={props.handleCloseConfirmationModal} backdrop="static">
            <Modal.Header>
                <Modal.Title style={{ margin: 'auto' }}>{props.error}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    if (
                        props.error === 'Your info has been successfully added!'
                        || props.error === 'Your info has been successfully updated!'
                        || props.error === 'Your measurements has been successfully deleted!'
                    ) {
                        props.handleCloseConfirmationModal()
                    }
                    else {
                        props.handleCloseConfirmationModal();
                        props.handleShowAddPersonalInfo()
                    }
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )

}