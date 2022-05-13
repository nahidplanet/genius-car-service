import React from 'react';
import { Button, Col, Container, Row, } from 'react-bootstrap';
import { useSignInWithGoogle, useSignInWithFacebook, useSignInWithGithub } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase/firebase.init';
import google from '../../../images/social/google.png'
import facebook from '../../../images/social/facebook.png'
import github from '../../../images/social/github.png'
import Loading from '../Loading/Loading';



const LoginWithOthers = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, userF, loadingF, errorF] = useSignInWithFacebook(auth);
    const [signInWithGithub, userG, loadingG, errorG] = useSignInWithGithub(auth);
    let handleError;

    const navigate = useNavigate()
    if (user || userG || userF) {
        navigate('/home');
    }
    if (loading || loadingF || loadingG) {
        return <Loading></Loading>;
    }
    if (error || errorF || errorG) {
        return handleError = <p className='text-danger'>Error: {error?.message}{errorF?.message}{errorG?.message}</p>;
        
    }
    const handleGooglSingin = (e) => {
        e.preventDefault();
        signInWithGoogle();
    }
    const handleFacbookSingin = (e) => {
        e.preventDefault();
        signInWithFacebook();
    }
    const handleGithubSingin = (e) => {
        e.preventDefault();
        signInWithGithub();
    }


    return (
        <Container className='d-block'>
            <Row>
                
                <Col xs={12} sm={12} md={12} lg={12} className='text-parimary mx-auto'>
                {handleError&&handleError}
                    <div className='mx-auto my-0'>
                        <Button onClick={handleGooglSingin} className='w-100 mt-2 bg-light border-primary text-primary border-rounded'>
                            <img width={'30'} src={google} alt="google" />
                            <span>google</span>
                        </Button>
                        <Button onClick={handleFacbookSingin} className='w-100 mt-2 bg-light border-primary text-primary border-rounded'>
                            <img width={'30'} src={facebook} alt="facebook" />
                            <span>FaceBook</span>
                        </Button>
                        <Button onClick={handleGithubSingin} className='w-100 mt-2 bg-light border-primary text-primary border-rounded'>
                            <img width={'30'} src={github} alt="github" />
                            <span>Github</span>
                        </Button>
                    </div>

                </Col>
            </Row>
        </Container>

    );
};

export default LoginWithOthers;