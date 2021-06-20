import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setError('');
            setLoading(true);
            const userInfo = await login(emailRef.current.value, passwordRef.current.value);
            if (userInfo.user.emailVerified) {
                history.push('/')
            }
            else {
                setError('Please verify your email!')
            }
        } catch (e) {
            setError(e.code === 'auth/user-not-found' ? 'User doest not exist or wrong email! Sign up or check email credential!' : e.code === 'auth/wrong-password' ? 'Invalid password!' : 'Failed to sign in!')
        }
        setLoading(false);
    }

    return (
        <React.Fragment>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign in</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={(e) => handleLogin(e)}>
                                <Form.Group id="email" className="mt-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" required ref={emailRef} placeholder="Please enter your e-mail"></Form.Control>
                                </Form.Group>
                                <Form.Group id="password" className="mt-2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" required ref={passwordRef} placeholder="Please enter your password"></Form.Control>
                                </Form.Group>
                                <Button type="submit" className="text-center w-100 mt-4" disabled={loading}>Log in</Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link to="/forgot-password">Forgot password?</Link>
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
