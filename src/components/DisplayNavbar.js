import React from 'react'
import { Nav, Button, Navbar } from 'react-bootstrap'
import '../style.css'
// import logo from '../images/gym_logo.jpg'

export default function DisplayNavbar(props) {

    return (
        <Navbar expand="lg" className="d-flex flex-row" style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {
                props.personalInfo.length > 0 && props.personalInfo.map(item => (
                    <div key={item.id} id="navbarBrand">
                        <span id="navbarBrand-name">
                            <Navbar.Brand style={{ fontWeight: '500', color: 'rgba(255,255,255,0.75)' }}>
                                {/* <img src={logo} style={{ width: '30px', height: '30px' }}></img> */}
                                <span>{item.firstName} {item.lastName}</span>
                            </Navbar.Brand></span><br />
                        <span id="navbarBrand-email"><Navbar.Brand style={{ fontWeight: '400', color: 'rgba(255,255,255,0.75)' }}>{props.currentUser.email}</Navbar.Brand></span>
                    </div>
                ))}
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />
            <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'center', }}>
                <Nav className="d-flex gap-4" style={{ marginLeft: 'auto' }} >
                    <br />
                    <Button id="addMeasurementsButton" onClick={() => props.handleShowAddMeasurements()} >Add today's measurements</Button>
                    {
                        props.personalInfo.length === 0 ?
                            <Button id="addInfoButton" onClick={props.handleShowAddPersonalInfo} style={{ padding: '10px' }}>Add personal info</Button>
                            :
                            <Button id="editPersInfoButton" onClick={props.handleShowEditPersonalInfo} style={{ padding: '10px' }}>Edit personal info</Button>
                    }

                    <Nav.Link id="logOutButton" onClick={props.handleShowLoggedOut}><span id="test">Log out</span></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )


}