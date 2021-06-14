import React, { useState, useRef, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { db } from '../services/firebase'
import { generate } from 'shortid'

export default function Dashboard() {

    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const ageRef = useRef()
    const editAgeRef = useRef()
    const sexRef = useRef()
    const editSexRef = useRef()
    const editFirstNameRef = useRef()
    const editLastNameRef = useRef()
    const waistRef = useRef()
    const armsRef = useRef()
    const quadsRef = useRef()
    const chestRef = useRef()

    const [measurements, setMeasurements] = useState([])
    const [personalInfo, setPersonalInfo] = useState([])

    const [showAddPersInfo, setShowAddPersInfo] = useState(false)
    const [showEditPersInfo, setShowEditPersInfo] = useState(false)
    const [showLoggedOut, setShowLoggedOut] = useState(false)
    const [showAddMeasurements, setShowAddMeasurements] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [error, setError] = useState('')

    const handleShowAddMeasurements = () => {
        setShowAddMeasurements(true)
    }
    const handleCloseAddMeasurements = () => {
        setShowAddMeasurements(true)
    }
    const handleCloseEditPersonalInfo = () => {
        setShowEditPersInfo(false)
    }
    const handleShowEditPersonalInfo = () => {
        setShowEditPersInfo(true)
    }
    const handleCloseAddPersonalInfo = () => {
        setShowAddPersInfo(false);
    }
    const handleShowAddPersonalInfo = () => {
        setShowAddPersInfo(true)
    };
    const handleShowLoggedOut = () => {
        setShowLoggedOut(true)
    }
    const handleCloseLoggedOut = () => {
        setShowLoggedOut(false)
    }
    const handleShowConfirmationModal = () => {
        setConfirmationModal(true)
    }
    const handleCloseConfirmationModal = () => {
        setConfirmationModal(false)
    }

    const getCurrentDateAndTime = () => {
        const completeDate = new Date()
        const day = completeDate.getDay() < 10 ? '0' + completeDate.getDay() : completeDate.getDay()
        let month = completeDate.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        const year = completeDate.getFullYear()
        const time = (completeDate.getHours() < 10 ? '0' + completeDate.getHours() : completeDate.getHours()) + ':' + (completeDate.getMinutes() < 10 ? '0' + completeDate.getMinutes() : completeDate.getMinutes()) + ':' + (completeDate.getSeconds() < 10 ? '0' + completeDate.getSeconds() : completeDate.getSeconds())
        const date = day + '/' + month + '/' + year

        return { time, date }
    }

    // adding personal info from inputs straight to firestore
    const addPersonalInfo = () => {
        if (!firstNameRef.current.value && !lastNameRef.current.value) {
            setError('Fill in first name or last name');
            handleShowConfirmationModal()
            return
        }
        else {
            db.collection('users')
                .doc(currentUser.uid)
                .collection('personal-info')
                .doc('Informatii personale')
                .set({
                    id: generate(),
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    age: ageRef.current.value,
                    sex: sexRef.current.value
                })
            setError('Your info has been successfully added!')
            handleCloseAddPersonalInfo()
            handleShowConfirmationModal()
        }

    }

    const addMeasurements = () => {
        db.collection('users')
            .doc(currentUser.uid)
            .collection('personal-info')
            .doc('Informatii personale')
            .set({
                id: generate(),
                arms: armsRef.current.value,
                quads: quadsRef.current.value,
                waist: waistRef.current.value,
                chest: chestRef.current.value,
                measured_at_day: getCurrentDateAndTime().date,
                measured_at_time: getCurrentDateAndTime().time
            })
        handleCloseAddPersonalInfo()
    }

    // fetching data from firestore - measurements + personal info
    const fetchData = () => {
        db.collection('users')
            .doc(currentUser.uid)
            .collection('measurements')
            .get()
            .then(response => {
                const tempArray = []
                response.forEach((item) => {
                    const objToBeAdded = {
                        id: item.id,
                        ...item.data()
                    }
                    tempArray.push(objToBeAdded)
                })
                setMeasurements(tempArray)
            })
            .catch(e => console.log(e))

        db.collection('users')
            .doc(currentUser.uid)
            .collection('personal-info')
            .get()
            .then(response => {
                const tempArray = []
                response.forEach((item) => {
                    const objToBeAdded = {
                        id: item.id,
                        ...item.data()
                    }
                    tempArray.push(objToBeAdded)
                })
                setPersonalInfo(tempArray)
            })
            .catch(e => console.log(e))

    }

    // calling fetch data once, as soon as component loads
    useEffect(() => {
        fetchData()
    }, [])

    const handleLogout = async () => {
        try {
            logout()
            history.push('/login')
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            <Navbar expand="lg" className="d-flex flex-row" style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    {
                        personalInfo.length > 0 && personalInfo.map(item => (
                            <div key={item.id} id="navbarBrand">
                                <Navbar.Brand style={{ fontWeight: '700', color: 'rgba(0,0,0,0.8)' }}>{item.firstName} {item.lastName}</Navbar.Brand><br />
                                <Navbar.Brand style={{ fontWeight: '500', color: 'white' }}>{currentUser.email}</Navbar.Brand>
                            </div>
                        ))}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: 'center' }} id="navbarRightSideItems">
                        <Nav className="d-flex gap-4" style={{ marginLeft: 'auto'}} >
                            <br />
                            <Button onClick={() => alert('To be implemented. Priority: I')}>Add today's measurements</Button>
                            {
                                personalInfo.length === 0 ?
                                    <Button onClick={handleShowAddPersonalInfo}>Add personal info</Button>
                                    :
                                    <Button onClick={handleShowEditPersonalInfo}>Edit personal info</Button>
                            }

                            <Nav.Link id="logOutButton" onClick={handleShowLoggedOut}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>


            {
                personalInfo.length === 0 ?
                    <Modal show={showAddPersInfo} onHide={handleCloseAddPersonalInfo} backdrop="static">
                        <Modal.Header style={{ backgroundColor: 'rgba(255, 25, 204, 0.2)' }}>
                            <Modal.Title style={{ margin: 'auto' }}>Add personal info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend style={{ display: 'flex' }}>
                                    <InputGroup.Text>First name</InputGroup.Text>
                                    <FormControl ref={firstNameRef} />
                                    <InputGroup.Text>Last name</InputGroup.Text>
                                    <FormControl ref={lastNameRef} />
                                </InputGroup.Prepend>

                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend style={{ display: 'flex' }}>
                                    <InputGroup.Text>Age</InputGroup.Text>
                                    <FormControl ref={ageRef} />
                                    <InputGroup.Text>Sex</InputGroup.Text>
                                    <FormControl ref={sexRef} />
                                </InputGroup.Prepend>

                            </InputGroup>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleCloseAddPersonalInfo}>
                                    Close
                                </Button>
                                <Button variant="success" onClick={() => addPersonalInfo()}>
                                    Add info
                                </Button>
                            </Modal.Footer>
                        </Modal.Body>
                    </Modal>
                    :
                    <Modal show={showEditPersInfo} onHide={handleCloseEditPersonalInfo} backdrop="static" >
                        <Modal.Header style={{ backgroundColor: 'rgba(255, 25, 204, 0.2)' }}>
                            <Modal.Title style={{ margin: 'auto' }}>Edit personal info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputGroup className="mb-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <InputGroup.Prepend style={{ display: 'block' }}>
                                    <InputGroup.Text>First name</InputGroup.Text>
                                    <InputGroup.Text>Last name</InputGroup.Text>
                                </InputGroup.Prepend>
                                {personalInfo.map(item => (
                                    <div key={item.id}>
                                        <FormControl ref={editFirstNameRef} defaultValue={item.firstName} />
                                        <FormControl ref={editLastNameRef} defaultValue={item.lastName} />
                                    </div>
                                ))}
                            </InputGroup>
                            <InputGroup className="mb-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <InputGroup.Prepend style={{ display: 'block' }}>
                                    <InputGroup.Text>Age</InputGroup.Text>
                                    <InputGroup.Text>Sex</InputGroup.Text>
                                </InputGroup.Prepend>
                                {personalInfo.map(item => (
                                    <div key={item.id}>
                                        <FormControl ref={editAgeRef} defaultValue={item.age} />
                                        <FormControl ref={editSexRef} defaultValue={item.sex} />
                                    </div>
                                ))}
                            </InputGroup>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleCloseEditPersonalInfo}>
                                    Close
                                </Button>
                                <Button variant="success" onClick={() => alert('To be implemented. Priority II')}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal.Body>
                    </Modal>
            }


            <Modal show={showLoggedOut} onHide={handleCloseLoggedOut} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Are you sure you want to log out?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleLogout}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={handleCloseLoggedOut}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={confirmationModal} onHide={handleCloseConfirmationModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{error}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseConfirmationModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {
                measurements && measurements.map(item => (
                    <div key={item.id} style={{ display: 'inline-block', padding: '20px' }}>
                        <div>Id: {item.id}</div>
                        <div>First name: {item.firstName}</div>
                        <div>Last name: {item.lastName}</div>
                    </div>
                ))
            }

        </React.Fragment >
    )
}
