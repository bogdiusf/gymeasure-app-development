import React from 'react'
import { Button } from 'react-bootstrap'
import '../style.css'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
// import { styled } from 'styled-components'

export default function DisplayMeasurements(props) {

    return (
        <>
            <div style={{ color: 'white', textAlign: 'center', marginTop: '15px' }}>
                <label>Search bar <input style={{ width: '370px' }} type="text" placeholder="onChange event and rerendering data for every keystroke"></input></label>
            </div>
            <div className="measurementsWrapper">
                {props.measurements && props.measurements.map(item =>
                    <div className="measurementDataWrapper" key={item.measurement_id}>
                        <h4>Measured on {item.measured_on} at {item.measured_at} </h4>
                        <InputGroup className="mb-3">
                            <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr 0.4fr', width: '100%', marginTop: '10px' }}>
                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }}>Body part</InputGroup.Text>
                                <InputGroup.Text style={{ backgroundColor: 'rgba(25,200,255,1)', fontWeight: '700', justifyContent: 'center' }}>Value</InputGroup.Text>
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>Unit</InputGroup.Text>
                            </div>
                            <InputGroup.Prepend style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr 0.4fr', margin: 'auto', marginTop: '10px', width: '100%' }}>

                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }}>Waist</InputGroup.Text>
                                <FormControl defaultValue={`${item.waist} cm`} style={{ textAlign: 'center', backgroundColor: 'rgba(25,200,255,1)', fontWeight: '500' }} />
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }}>cm</InputGroup.Text>

                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }}>Chest</InputGroup.Text>
                                <FormControl defaultValue={`${item.chest} cm`} style={{ textAlign: 'center', backgroundColor: 'rgba(25,200,255,1)', fontWeight: '500' }} />
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>


                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }}>Arms</InputGroup.Text>
                                <FormControl defaultValue={`${item.arms}`} style={{ textAlign: 'center', backgroundColor: 'rgba(25,200,255,1)', fontWeight: '500' }} />
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>


                                <InputGroup.Text style={{ backgroundColor: 'rgba(255,200,255,0.8)', fontWeight: '700', justifyContent: 'center' }} >Quads</InputGroup.Text>
                                <FormControl defaultValue={`${item.quads}`} style={{ textAlign: 'center', backgroundColor: 'rgba(25,200,255,1)', fontWeight: '500' }} />
                                <InputGroup.Text style={{ fontWeight: '700', justifyContent: 'center' }} disabled={true}>cm</InputGroup.Text>

                            </InputGroup.Prepend>
                        </InputGroup>
                        <div className="measurementsButtonsWrapper" style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'space-evenly' }}>
                            <Button onClick={() => alert('To be implemented. Priority I')}>Edit</Button>
                            <Button onClick={() => alert('To be implemented. Priority II')} variant="danger">Delete</Button>
                        </div>
                    </div>
                )
                }
            </div >
        </>
    )

}