import React from 'react'
import { useHistory } from 'react-router'
import { Button } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal"
import { useAuth } from '../contexts/AuthContext'

export default function LogoutModal(props) {

    const { logout } = useAuth()
    const history = useHistory()

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
        <Modal show={props.showLoggedOut} onHide={props.handleCloseLoggedOut} backdrop="static">
            <Modal.Header>
                <Modal.Title>Are you sure you want to log out?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="success" onClick={handleLogout} style={{ width: '80px' }}>
                    Yes
                </Button>
                <Button variant="danger" onClick={props.handleCloseLoggedOut} style={{ width: '80px' }}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )

}


