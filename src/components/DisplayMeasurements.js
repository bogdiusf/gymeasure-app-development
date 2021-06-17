import React from 'react'
import { Button } from 'react-bootstrap'
import '../style.css'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal'
// import { styled } from 'styled-components'

export default function DisplayMeasurements(props) {


    return (
        <>
            <div style={{ color: 'white', textAlign: 'center', padding:'30px' }}>
                <label>Search bar <input style={{ width: '370px', textAlign:'center' }} type="text" placeholder="dd/mm/yyyy" onChange={(e) => props.filterMeasurements(e.target.value)} /></label>
            </div>
            <div className="measurementsWrapper">
                {props.measurements && props.measurements.map(item =>
                    <div className="measurementDataWrapper" key={item.measurement_id}>
                        <h4>Measured on: {item.measured_on_day} </h4>
                        <h4>Measured at: {item.measured_at_time} </h4>
                        <InputGroup className="mb-3">
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 0.4fr', width: '100%', marginTop: '10px' }}>
                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }}>Body part</InputGroup.Text>
                                <InputGroup.Text style={{ backgroundColor: 'rgba(25,200,255,1)', fontWeight: '700', justifyContent: 'center' }}>Value</InputGroup.Text>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>Unit</InputGroup.Text>
                            </div>
                            <InputGroup.Prepend style={{ display: 'grid', gridTemplateColumns: '100px 1fr 0.4fr', margin: 'auto', marginTop: '10px', width: '100%' }}>
                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }}>Waist</InputGroup.Text>
                                <FormControl defaultValue={`${item.waist}`} style={{ textAlign: 'center', backgroundColor: 'rgba(25,200,255,1)', fontWeight: '500' }} disabled={true}/>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>cm</InputGroup.Text>

                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }}>Chest</InputGroup.Text>
                                <FormControl defaultValue={`${item.chest}`} style={{ textAlign: 'center', backgroundColor: 'rgba(25,200,255,1)', fontWeight: '500' }} disabled={true}/>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>

                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }}>Arms</InputGroup.Text>
                                <FormControl defaultValue={`${item.arms}`} style={{ textAlign: 'center', backgroundColor: 'rgba(25,200,255,1)', fontWeight: '500' }} disabled={true}/>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>

                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }} >Quads</InputGroup.Text>
                                <FormControl defaultValue={`${item.quads}`} style={{ textAlign: 'center', backgroundColor: 'rgba(25,200,255,1)', fontWeight: '500' }} disabled={true}/>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                        <div className="measurementsButtonsWrapper" style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'space-evenly' }}>
                            <Button onClick={() => {
                                props.handleShowEditMeasurements(item.document_id)
                                props.setTempDocId(item.document_id)
                            }}>Edit</Button>
                            <Button onClick={() => props.deleteMeasurement(item.document_id)} variant="danger">Delete</Button>
                        </div>
                    </div>
                )
                }
                {props.measurements.length === 0 ?
                    <h1 style={{color:'white', marginTop:'50px', textAlign:'center'}}>No measurements</h1>
                    :
                    ''
                }
            </div >

            {/* <DeleteConfirmationModal /> */}
        </>
    )

}