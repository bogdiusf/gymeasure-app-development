import React from 'react'
import Modal from "react-bootstrap/Modal"
import { Button } from 'react-bootstrap'

export default function DeleteConfirmationModal(){
    return (
        <Modal show={true} backdrop="static">
            <Modal.Header>
                <Modal.Title>Are you sure you want to log out?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="success"  style={{ width: '80px' }}>
                    Yes
                </Button>
                <Button variant="danger"  style={{ width: '80px' }}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )
}