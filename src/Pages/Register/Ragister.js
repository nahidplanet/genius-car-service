import React, { useRef, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';

const Ragister = () => {
    const [showError, setShowError] = useState('');
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword) {
            setShowError('Two Password Not Matching...');
            return;
        } else if (password.length < 6 && confirmPassword.length < 6) {
            setShowError('Password Must Be six (6) character...');
            return;
        } else {
            createUserWithEmailAndPassword(email, password);
            showError(error);
        }


    }
    const navigateLogin = () => {
        navigate('/login')
    }
    return (
        <Container className='w-25'>
            <Row>
                <h1 className='text-center text-primary'>Register</h1>
                <Form onSubmit={handleRegisterSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Your Full Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Your Full Name" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
                    </Form.Group>

                    <p className='text-danger'>
                        {
                            showError
                        }
                    </p>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p>Already have an account? <span onClick={navigateLogin} style={{ cursor: 'pointer' }} className="text-danger">Go to Login</span></p>

            </Row>

        </Container>
    );
};

export default Ragister;