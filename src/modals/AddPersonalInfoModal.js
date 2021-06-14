import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function AddPersonalInfoModal(props) {
    return (
        <Modal show={props.showAddPersInfo} onHide={props.handleCloseAddPersonalInfo} backdrop="static">
            <Modal.Header style={{ backgroundColor: '#0d6efd' }}>
                <Modal.Title style={{ margin: 'auto', color: 'white' }}>Add personal info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend style={{ display: 'flex' }}>
                        <InputGroup.Text>First name</InputGroup.Text>
                        <FormControl ref={props.firstNameRef} value={props.firstName} onChange={e => props.setFirstName(e.target.value)} />
                        <InputGroup.Text>Last name</InputGroup.Text>
                        <FormControl ref={props.lastNameRef} value={props.lastName} onChange={e => props.setLastName(e.target.value)} />
                    </InputGroup.Prepend>

                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend style={{ display: 'flex' }}>
                        <InputGroup.Text>Age</InputGroup.Text>
                        <FormControl ref={props.ageRef} value={props.age} onChange={e => props.setAge(e.target.value)} />
                        <InputGroup.Text>Sex</InputGroup.Text>
                        <FormControl ref={props.sexRef} value={props.sex} onChange={e => props.setSex(e.target.value)} />
                    </InputGroup.Prepend>

                </InputGroup>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.handleCloseAddPersonalInfo}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => props.addPersonalInfo()}>
                        Add info
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}