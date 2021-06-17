import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import { db } from '../services/firebase'
import { generate } from 'shortid'
import ConfirmationModal from '../modals/ConfirmationModal'
import DisplayMeasurements from './DisplayMeasurements'
import EditPersonalInfoModal from '../modals/EditPersonalInfoModal'
import LogoutModal from '../modals/LogoutModal'
import AddPersonalInfoModal from '../modals/AddPersonalInfoModal'
import DisplayNavbar from './DisplayNavbar'
import AddMeasurements from '../modals/AddMeasurements'

export default function Dashboard() {

    const { currentUser } = useAuth()


    // declaring references from inputs ------
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
    // ----------------------

    // initializing needed states  -----------
    const [measurements, setMeasurements] = useState([])
    const [personalInfo, setPersonalInfo] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [armsSize, setArmsSize] = useState('')
    const [quadsSize, setQuadsSize] = useState('')
    const [chestSize, setChestSize] = useState('')
    const [waistSize, setWaistSize] = useState('')
    const [showAddMeasurements, setShowAddMeasurements] = useState(false)
    const [isSaveChangesEnabled, setIsSaveChangesEnabled] = useState(false)
    const [showAddPersInfo, setShowAddPersInfo] = useState(false)
    const [showEditPersInfo, setShowEditPersInfo] = useState(false)
    const [showLoggedOut, setShowLoggedOut] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [error, setError] = useState('')
    // ---------------------


    // declaring functions who when called, change the behaviour of the modals 
    const handleShowAddMeasurements = () => setShowAddMeasurements(true)
    const handleCloseAddMeasurements = () => setShowAddMeasurements(false)

    const handleCloseEditPersonalInfo = () => {
        setShowEditPersInfo(false)
        setIsSaveChangesEnabled(false)
    }
    const handleShowEditPersonalInfo = () => setShowEditPersInfo(true)
    const handleCloseAddPersonalInfo = () => setShowAddPersInfo(false)
    const handleShowAddPersonalInfo = () => setShowAddPersInfo(true)
    const handleShowLoggedOut = () => setShowLoggedOut(true)
    const handleCloseLoggedOut = () => setShowLoggedOut(false)
    const handleShowConfirmationModal = () => setConfirmationModal(true)
    const handleCloseConfirmationModal = () => {
        setConfirmationModal(false)
        setIsSaveChangesEnabled(false)
    }
    // --------------------


    // function that returns a formatted date 'dd/mm/yyyy' and time 'hh:mm:ss'
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
    const addPersonalInfo = async () => {
        if (!firstNameRef.current.value || !lastNameRef.current.value) {
            if (firstNameRef.current.value) {
                setError('Attention! Type your last name in order to continue!');
            }
            else
                if (lastNameRef.current.value) {
                    setError('Attention! Type your first name in order to continue!');
                }
                else {
                    setError('Attention! Both first name and last name must be typed in order to continue!');
                }
            handleCloseAddPersonalInfo()
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

    // adding measurements from inputs straight to firestore
    const addMeasurements = async () => {
        db.collection('users')
            .doc(currentUser.uid)
            .collection('measurements')
            .doc()
            .set({
                measurement_id: generate(),
                arms: armsRef.current.value,
                quads: quadsRef.current.value,
                waist: waistRef.current.value,
                chest: chestRef.current.value,
                measured_on: getCurrentDateAndTime().date,
                measured_at: getCurrentDateAndTime().time
            })

        setError('Your info has been successfully added!')
        handleCloseAddMeasurements()
        handleShowConfirmationModal()
        setWaistSize('')
        setArmsSize('')
        setQuadsSize('')
        setChestSize('')


    }
    console.log(measurements)
    // fetching data from firestore - measurements + personal info
    const fetchData = async () => {
        db.collection('users')
            .doc(currentUser.uid)
            .collection('measurements')
            .onSnapshot(response => {
                const tempArray = []
                response.forEach((item) => {
                    const objToBeAdded = {
                        document_id: item.id,
                        ...item.data()
                    }
                    tempArray.push(objToBeAdded)
                })
                setMeasurements(tempArray)
            })


        db.collection('users')
            .doc(currentUser.uid)
            .collection('personal-info')
            .onSnapshot(response => {
                const tempArray = []
                response.forEach((item) => {
                    const objToBeAdded = {
                        id: item.id,
                        ...item.data()
                    }
                    tempArray.push(objToBeAdded)
                })
                setPersonalInfo(tempArray)
                if (personalInfo.length === 0) {
                    setFirstName('')
                    setLastName('')
                    setAge('')
                    setSex('')
                }
            })
    }

    const updatePersonalInfo = async () => {
        await db.collection('users')
            .doc(currentUser.uid)
            .collection('personal-info')
            .doc('Informatii personale')
            .update({
                firstName: editFirstNameRef.current.value,
                lastName: editLastNameRef.current.value,
                age: editAgeRef.current.value,
                sex: editSexRef.current.value
            })
        try {

            setError('Your info has been successfully updated!')
            handleCloseEditPersonalInfo()
            handleShowConfirmationModal()
        }
        catch (e) {
            alert(`${e}`)
        }


    }

    // calling fetchData once, as soon as component loads
    useEffect(() => {
        fetchData()
    }, [])



    return (
        <React.Fragment>

            <DisplayNavbar
                personalInfo={personalInfo}
                currentUser={currentUser}
                handleShowAddPersonalInfo={handleShowAddPersonalInfo}
                handleShowEditPersonalInfo={handleShowEditPersonalInfo}
                handleShowLoggedOut={handleShowLoggedOut}
                handleShowAddMeasurements={handleShowAddMeasurements}
            />

            <AddMeasurements
                showAddMeasurements={showAddMeasurements}
                handleCloseAddMeasurements={handleCloseAddMeasurements}
                addMeasurements={addMeasurements}
                waistRef={waistRef}
                armsRef={armsRef}
                quadsRef={quadsRef}
                chestRef={chestRef}
                armsSize={armsSize}
                quadsSize={quadsSize}
                chestSize={chestSize}
                waistSize={waistSize}
                setChestSize={setChestSize}
                setArmsSize={setArmsSize}
                setWaistSize={setWaistSize}
                setQuadsSize={setQuadsSize}
            />

            {   // render AddPersonalInfoModal only if logged user doesnt have any personal info, else, render edit modal
                personalInfo.length === 0 ?

                    <AddPersonalInfoModal
                        showAddPersInfo={showAddPersInfo}
                        handleCloseAddPersonalInfo={handleCloseAddPersonalInfo}
                        firstNameRef={firstNameRef}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastNameRef={lastNameRef}
                        lastName={lastName}
                        setLastName={setLastName}
                        ageRef={ageRef}
                        age={age}
                        setAge={setAge}
                        sexRef={sexRef}
                        sex={sex}
                        setSex={setSex}
                        addPersonalInfo={addPersonalInfo}
                    />
                    :
                    <EditPersonalInfoModal
                        showEditPersInfo={showEditPersInfo}
                        handleCloseEditPersonalInfo={handleCloseEditPersonalInfo}
                        personalInfo={personalInfo}
                        editFirstNameRef={editFirstNameRef}
                        editLastNameRef={editLastNameRef}
                        editAgeRef={editAgeRef}
                        editSexRef={editSexRef}
                        updatePersonalInfo={updatePersonalInfo}
                        isSaveChangesEnabled={isSaveChangesEnabled}
                        setIsSaveChangesEnabled={setIsSaveChangesEnabled}
                        firstNamePassed={firstName}
                    />
            }

            {/* render logout modal */}
            <LogoutModal
                showLoggedOut={showLoggedOut}
                handleCloseLoggedOut={handleCloseLoggedOut}
            />

            {/* confirmation modal thats being rendered on errors or succeded actions */}
            <ConfirmationModal
                confirmationModal={confirmationModal}
                handleCloseConfirmationModal={handleCloseConfirmationModal}
                handleShowAddPersonalInfo={handleShowAddPersonalInfo}
                error={error}
                handleCloseEditPersonalInfo={handleCloseEditPersonalInfo}
            />

            <DisplayMeasurements measurements={measurements} />

        </React.Fragment >
    )
}
