import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function EditMeasurementsModal(props) {


    return (
        <Modal show={props.showEditMeasurements} onHide={props.handleCloseEditPersonalInfo} backdrop="static" >
            <Modal.Header style={{ backgroundColor: '#0d6efd' }}>
                <Modal.Title style={{ margin: 'auto', color: 'white' }}>Edit measurements</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <InputGroup className="mb-3" style={{ justifyContent: 'center' }}>
                    <InputGroup.Prepend style={{ display: 'grid', gridTemplateColumns: '0.5fr 2.5fr', margin: 'auto' }}>
                        <InputGroup.Text>Waist</InputGroup.Text>
                        <FormControl ref={props.editWaistRef} defaultValue={props.waistEdited} onChange={() => props.setIsSaveMeasurementChangesEnabled(true)} type="number" />
                        <InputGroup.Text>Chest</InputGroup.Text>
                        <FormControl ref={props.editChestRef} defaultValue={props.chestEdited} onChange={() => props.setIsSaveMeasurementChangesEnabled(true)} type="number" />
                        <InputGroup.Text>Arms</InputGroup.Text>
                        <FormControl ref={props.editArmsRef} defaultValue={props.armsEdited} onChange={() => props.setIsSaveMeasurementChangesEnabled(true)} type="number" />
                        <InputGroup.Text>Quads</InputGroup.Text>
                        <FormControl ref={props.editQuadsRef} defaultValue={props.quadsEdited} onChange={() => props.setIsSaveMeasurementChangesEnabled(true)} type="number" />
                    </InputGroup.Prepend>
                </InputGroup>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.handleCloseEditMeasurements}>
                        Close
                    </Button>
                    <Button disabled={!props.isSaveMeasurementChangesEnabled} variant="success" onClick={() => {
                        props.updateMeasurements(props.tempDocId)
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}