import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function EditPersonalInfoModal(props) {

    return (
        <Modal show={props.showEditPersInfo} onHide={props.handleCloseEditPersonalInfo} backdrop="static" >
            <Modal.Header style={{ backgroundColor: '#0d6efd' }}>
                <Modal.Title style={{ margin: 'auto', color: 'white' }}>Edit personal info</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <InputGroup className="mb-3">
                    {props.personalInfo.map(item => (
                        <InputGroup.Prepend style={{ display: 'grid', gridTemplateColumns: '0.5fr 2.5fr', margin: 'auto' }} key={item.id}>
                            <InputGroup.Text>First name</InputGroup.Text>
                            <FormControl ref={props.editFirstNameRef} defaultValue={item.firstName} onChange={() => props.setIsSavePInfoChangesEnabled(true)} />
                            <InputGroup.Text>Last name</InputGroup.Text>
                            <FormControl ref={props.editLastNameRef} defaultValue={item.lastName} onChange={() => props.setIsSavePInfoChangesEnabled(true)} />
                            <InputGroup.Text>Age</InputGroup.Text>
                            <FormControl ref={props.editAgeRef} defaultValue={item.age} onChange={() => props.setIsSavePInfoChangesEnabled(true)} />
                            <InputGroup.Text>Sex</InputGroup.Text>
                            <FormControl ref={props.editSexRef} defaultValue={item.sex} onChange={() => props.setIsSavePInfoChangesEnabled(true)} />
                        </InputGroup.Prepend>
                    ))}
                </InputGroup>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.handleCloseEditPersonalInfo}>
                        Close
                    </Button>
                    <Button disabled={!props.isSavePInfoChangesEnabled} variant="success" onClick={() => props.updatePersonalInfo()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )

}