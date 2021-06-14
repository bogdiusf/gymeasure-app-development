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
                <InputGroup className="mb-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <InputGroup.Prepend style={{ display: 'block' }}>
                        <InputGroup.Text>First name</InputGroup.Text>
                        <InputGroup.Text>Last name</InputGroup.Text>
                    </InputGroup.Prepend>
                    {props.personalInfo.map(item => (
                        <div key={item.id}>
                            <FormControl ref={props.editFirstNameRef} defaultValue={item.firstName} />
                            <FormControl ref={props.editLastNameRef} defaultValue={item.lastName} />
                        </div>
                    ))}
                </InputGroup>
                <InputGroup className="mb-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <InputGroup.Prepend style={{ display: 'block' }}>
                        <InputGroup.Text>Age</InputGroup.Text>
                        <InputGroup.Text>Sex</InputGroup.Text>
                    </InputGroup.Prepend>
                    {props.personalInfo.map(item => (
                        <div key={item.id}>
                            <FormControl ref={props.editAgeRef} defaultValue={item.age} />
                            <FormControl ref={props.editSexRef} defaultValue={item.sex} />
                        </div>
                    ))}
                </InputGroup>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.handleCloseEditPersonalInfo}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => alert('To be implemented. Priority II')}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )

}