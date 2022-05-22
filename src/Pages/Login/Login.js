import React, { useEffect, useRef, } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase/firebase.init';
import LoginWithOthers from '../Shared/LoginWithOthers/LoginWithOthers';
// import ForgetPassword from './ForgetPassword/ForgetPassword';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';
import PageTitle from '../Shared/PageTitle/PageTitle';
// import axios from 'axios';
import useToken from '../../hooks/useToken';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    // const [email, setEmail] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
    let from = location?.state?.from?.pathname || "/";
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const [token] = useToken(user);

    if (token) {
        navigate(from, { replace: true });
    }
    // handle error 
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>;
    }
    if (loading || sending) {
        return <Loading></Loading>;
    }


    // form submit eventhandler 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);
    }

    // reset password 
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('set email verification');
        }

    }
    // navigate to register page 
    const navigateRagister = () => {
        navigate('/register');
    }

    return (
        <Container className=' p-5 d-flex justify-content-center'>
            <PageTitle title={'login'}></PageTitle>
            <Row>
                <h1 className='text-parimary text-center mx-auto'>Please Login</h1>

                <Col xs={12} sm={12} md={6} lg={6} className='text-parimary mx-auto'>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                        </Form.Group>
                        {errorElement}
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>

                    <p
                        onClick={resetPassword}
                    >
                        Reset password?
                        <span onClick={navigateRagister} className="text-danger" style={{ cursor: 'pointer' }}> Go to Register</span>
                    </p>
                    <div className='divider d-flex align-items-center justify-content-center'>
                        <p className='dvider'></p>
                        <p className='mx-2'>or</p>
                        <p className='dvider'></p>
                    </div>
                    <div className="login-with-others">
                        <LoginWithOthers></LoginWithOthers>
                    </div>
                </Col>

            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Login;