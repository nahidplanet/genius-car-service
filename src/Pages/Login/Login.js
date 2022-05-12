import React, { useRef } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase/firebase.init';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    let location = useLocation();
    let [user] = useAuthState(auth);

    let from = location.state?.from?.pathname || "/";

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }
    if (user) {
        navigate(from, { replace: true });
    }
    const navigateRagister = () => {
        navigate('/register');
    }
    return (
        <Container className='w-25'>
            <h1 className='text-parimary text-center mx-auto'>Please Login</h1>
            <Row>
                <Form onSubmit={handleFormSubmit}>
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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p>New to genius Car? <span onClick={navigateRagister} className="text-danger" style={{ cursor: 'pointer' }}>Go to Register</span></p>
            </Row>
        </Container>
    );
};

export default Login;