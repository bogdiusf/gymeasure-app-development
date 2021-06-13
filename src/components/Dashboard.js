import React, { useState, useRef } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import firebase from 'firebase'

export default function Dashboard() {

    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const firstNameRef = useRef()
    const lastNameRef = useRef()

    const handleLogout = async () => {
        try {
            logout()
            history.push('/login')
        }
        catch (e) {
            console.log(e)
        }
    }

    console.log(currentUser.uid)

    const [show, setShow] = useState(false);
    const [showLoggedOut, setShowLoggedOut] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true)
    };

    const handleShowLoggedOut = () => {
        setShowLoggedOut(true)
    }

    const handleCloseLoggedOut = () => {
        setShowLoggedOut(false)
    }

    const addData = () => {
        firebase.firestore().collection('users')
            .doc('asd')
            .set({
                id: 'asd',
                firstName: 'jos',
                lastName: 'stalin'

            })
            .then(response => console.log(response))
        // setShowLoggedOut(false)
    }

    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg" className="d-flex flex-row" style={{ padding: '20px' }}>
                <Navbar.Brand>{currentUser.email}</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'center' }}>
                    <Nav className="d-flex gap-4" style={{ marginLeft: 'auto', marginRight: '15px' }}>
                        <br />
                        <Button onClick={handleShow}>Add measurements</Button>
                        <Nav.Link onClick={handleShowLoggedOut} style={{ border: '1px solid rgba(0,0,0,0.3)', borderRadius: '5px' }}>Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>First and last name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl ref={firstNameRef} />
                        <FormControl ref={lastNameRef} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => addData()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLoggedOut} onHide={handleCloseLoggedOut} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Are you sure you want to log out?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleLogout}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleCloseLoggedOut}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
