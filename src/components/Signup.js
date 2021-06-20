import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom'
// import {createUserDocument} from '../services/firebase'


export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSignUp = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('Passwords do not match!')
        }
        try {
            setError('');
            setLoading(true);
            // const { user } = await signup(emailRef.current.value, passwordRef.current.value);
            await signup(emailRef.current.value, passwordRef.current.value);
            // console.log(user)
            // await createUserDocument(user)
            history.push('/login')
        } catch (e) {
            setError(`Failed to create an account! ${e}`)
        }

        setLoading(false)

    }

    return (
        <React.Fragment>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSignUp}>
                                <Form.Group id="email" className="mt-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" required ref={emailRef} placeholder="Please enter your e-mail"></Form.Control>
                                </Form.Group>
                                <Form.Group id="password" className="mt-2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" required ref={passwordRef} placeholder="Please enter the desired password"></Form.Control>
                                </Form.Group>
                                <Form.Group id="passwordConfirmation" className="mt-2">
                                    <Form.Label>Password confirmation</Form.Label>
                                    <Form.Control type="password" required ref={passwordConfirmationRef} placeholder="Please repeat your password"></Form.Control>
                                </Form.Group>
                                <Button type="submit" className="text-center w-100 mt-4" disabled={loading}>Sign up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <span style={{ color: 'white' }}>Already have an account?</span> <Link to="/login">Log in</Link>
                    </div>
                </div>
            </Container>
        </React.Fragment >
    )
}
