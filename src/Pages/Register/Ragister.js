import React, { useRef, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import LoginWithOthers from '../Shared/LoginWithOthers/LoginWithOthers';
import './Register.css'
import Loading from '../Shared/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Ragister = () => {
    const [agree, setAgree] = useState(false);
    const [showError, setShowError] = useState('');
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    let handleError;
    const navigate = useNavigate();

    // create account with email password 
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});

    // update profile 
    const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
    if (updateProfileError) {
        console.log(updateProfileError);
    }
    // form submit eventHandler 
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        // password check 
        if (password !== confirmPassword) {
            setShowError('Two Password Not Matching...');
            return;
        } else if (password.length < 6 && confirmPassword.length < 6) {
            setShowError('Password Must Be six (6) character...');
            return;
        } else {
           await createUserWithEmailAndPassword(email, password);
           await updateProfile({ displayName: name });
           console.log("update-protile");
           navigate('/home');

        }
    }
    if (loading||updating) {
        return <Loading></Loading>;
      }
    if (error) {
        handleError = <p className='text-danger' >Error: {error?.message}</p>
    }
    const navigateLogin = () => {
        navigate('/login')
    }

    return (
        <Container className='w-50'>
            <Row>
                <h1 className='text-center text-primary'>Register</h1>
                <Form onSubmit={handleRegisterSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Your Full Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Your Full Name" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                       
                        <Form.Check onClick={()=>setAgree(!agree)} type="checkbox" className='d-inline me-2' id='check' />
                        <label htmlFor='check' className={`d-inline ${!agree?'text-danger':'text-primary'}`}>Genius-car Terms & conditions</label>
                    </Form.Group>
                    <Button disabled={!agree} variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <p>Already have an account? <span onClick={navigateLogin} style={{ cursor: 'pointer' }} className="text-danger">Go to Login</span></p>
                <div className='divider d-flex align-items-center justify-content-center'>
                    <p className='dvider'></p>
                    <p className='mx-2'>or</p>
                    <p className='dvider'></p>
                </div>
                <div className="login-with-others">
                    <LoginWithOthers></LoginWithOthers>
                </div>
            </Row>

        </Container>
    );
};

export default Ragister;