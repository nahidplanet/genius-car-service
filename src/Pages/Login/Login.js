import React, { useRef, useState } from 'react';
import { Button, Container, Form, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase/firebase.init';
import LoginWithOthers from '../Shared/LoginWithOthers/LoginWithOthers';
// import ForgetPassword from './ForgetPassword/ForgetPassword';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    // const [email, setEmail] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
    // redirect path 
    let from = location?.state?.from?.pathname || "/";
    let errorElement;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
    );
    // rediret after login 
    if (user) {
        navigate(from, { replace: true });
    }
    // handle error 
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>;
    }
    if (loading||sending) {
        return <Loading></Loading>;
      }
    // form submit eventhandler 
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        // setEmail(email);
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }
    // reset password 
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('set email verification');
        }else{
            toast('Please Enter Your Email');
        }
        
    }
    // navigate to register page 
    const navigateRagister = () => {
        navigate('/register');
    }

    return (
        <Container className='w-50 p-5'>
            <h1 className='text-parimary text-center mx-auto'>Please Login</h1>
            <Row>
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

                {/* <ForgetPassword email={email}></ForgetPassword> */}
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
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Login;