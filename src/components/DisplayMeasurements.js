import React from 'react'
// import { styled } from 'styled-components'

export default function DisplayMeasurements(props) {

    return (
        props.personalInfo && props.personalInfo.map(item =>
            <div key={item.id} style={{ display: 'inline-block', padding: '20px' }}>
                <div>Id: {item.id}</div>
                <div>First name: {item.firstName}</div>
                <div>Last name: {item.lastName}</div>
            </div>
        )
    )

}