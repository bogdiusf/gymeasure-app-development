import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {

    const emailRef = useRef()

    const { forgotPassword } = useAuth()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleResetPassword = async (e) => {
        e.preventDefault()

        try {
            setError('');
            setLoading(true);
            await forgotPassword(emailRef.current.value);
            setMessage('An email has been sent to your inbox. Please check it for further information on how to reset your password!')
        } catch (e) {
            setError('Email does not exist!')
        }
        setLoading(false)
    }

    return (
        <React.Fragment>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign in</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleResetPassword}>
                                <Form.Group id="email" className="mt-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" required ref={emailRef} placeholder="Please enter your e-mail"></Form.Control>
                                </Form.Group>
                                <Button type="submit" className="text-center w-100 mt-4" disabled={loading}>Reset password</Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                Successfully reseted password? <Link to="/login">Log in</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <span style={{ color: 'white' }}>Don't have an account?</span> <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}
