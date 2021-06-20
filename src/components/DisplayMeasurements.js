import React from 'react'
import { Button } from 'react-bootstrap'
import '../style.css'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal'

export default function DisplayMeasurements(props) {


    return (
        <>
            <div style={{ color: 'white', textAlign: 'center', width: '80%', margin: 'auto', marginTop: '30px', padding: '0' }}>
                <InputGroup className="mb-3 searchInputGroup">
                    <InputGroup.Text>Search by date</InputGroup.Text>
                    <FormControl placeholder="dd/mm/yyyy" style={{ textAlign: 'center', fontWeight: '500' }} onChange={(e) => props.filterMeasurements(e.target.value)} />
                </InputGroup>
            </div>
            <div className="measurementsWrapper">
                {props.measurements && props.measurements.map(item =>
                    <div className="measurementDataWrapper" key={item.measurement_id}>
                        <h4>Measured on: {item.measured_on_day} </h4>
                        <h4>Measured at: {item.measured_at_time} </h4>
                        <InputGroup className="mb-3">
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 0.4fr', width: '100%', marginTop: '10px' }}>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>Body part</InputGroup.Text>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>Value</InputGroup.Text>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>Unit</InputGroup.Text>
                            </div>
                            <InputGroup.Prepend style={{ display: 'grid', gridTemplateColumns: '100px 1fr 0.4fr', margin: 'auto', marginTop: '10px', width: '100%' }}>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>Waist</InputGroup.Text>
                                <FormControl defaultValue={`${item.waist}`} style={{ textAlign: 'center', fontWeight: '500' }} disabled={true} />
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>cm</InputGroup.Text>

                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>Chest</InputGroup.Text>
                                <FormControl defaultValue={`${item.chest}`} style={{ textAlign: 'center', fontWeight: '500' }} disabled={true} />
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>

                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>Arms</InputGroup.Text>
                                <FormControl defaultValue={`${item.arms}`} style={{ textAlign: 'center', fontWeight: '500' }} disabled={true} />
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>

                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} >Quads</InputGroup.Text>
                                <FormControl defaultValue={`${item.quads}`} style={{ textAlign: 'center', fontWeight: '500' }} disabled={true} />
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                        <div className="measurementsButtonsWrapper" style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'space-evenly' }}>
                            <Button onClick={() => {
                                props.handleShowEditMeasurements(item.document_id)
                                props.setTempDocId(item.document_id)
                            }}>Edit</Button>
                            <Button onClick={() => props.showDeleteMeasurementConfirmation()} variant="danger">Delete</Button>
                        </div>
                        <DeleteConfirmationModal
                            showDeleteMeasurementConfirmation={props.showDeleteMeasurementConfirmation}
                            showDeleteMeasurementConfirmationModal={props.showDeleteMeasurementConfirmationModal}
                            document_id={item.document_id}
                            deleteMeasurement={props.deleteMeasurement}
                            closeDeleteMeasurementConfirmation={props.closeDeleteMeasurementConfirmation}
                        />
                    </div>

                )}
                {props.measurements.length === 0 ?
                    <h1 style={{ color: 'white', marginTop: '50px', textAlign: 'center' }}>No measurements</h1>
                    :
                    ''
                }
            </div >
        </>
    )

}