import React from 'react'
import Modal from "react-bootstrap/Modal"
import { Button } from 'react-bootstrap'

export default function DeleteConfirmationModal(props) {
    return (
        <Modal show={props.showDeleteMeasurementConfirmationModal} onHide={props.closeDeleteMeasurementConfirmationModal} backdrop="static">
            <Modal.Header>
                <Modal.Title>Are you sure you want to delete this measurement?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="success" style={{ width: '80px' }} onClick={() => props.deleteMeasurement(props.document_id)}>
                    Yes
                </Button>
                <Button variant="danger" style={{ width: '80px' }} onClick={() => props.closeDeleteMeasurementConfirmation()}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )
}