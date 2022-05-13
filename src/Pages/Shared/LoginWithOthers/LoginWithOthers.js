import React from 'react';
import { Button } from 'react-bootstrap';
import { useSignInWithGoogle, useSignInWithFacebook, useSignInWithGithub } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase/firebase.init';
import google from '../../../images/social/google.png'
import facebook from '../../../images/social/facebook.png'
import github from '../../../images/social/github.png'
import Loading from '../Loading/Loading';



const LoginWithOthers = () => {
    const [signInWithGoogle, user, loading,error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, userF, loadingF, errorF] = useSignInWithFacebook(auth);
    const [signInWithGithub, userG, loadingG, errorG] = useSignInWithGithub(auth);
    let handleError;

    const navigate = useNavigate()
    if (user || userG || userF) {
        navigate('/home');
        console.log(user, userG, userF);
    }
    if (loading || loadingF || loadingG) {
        return <Loading></Loading>;
    }
    if (error || errorF || errorG) {
        return handleError = <p className='text-danger' >Error: {error?.message}</p>;
    }
    const handleGooglSingin = () => {
        signInWithGoogle();
    }
    const handleFacbookSingin = () => {
        signInWithFacebook();
    }
    const handleGithubSingin = () => {
        signInWithGithub();
    }


    return (
        <div className='mx-auto my-0 w-50'>
            {handleError}
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
    );
};

export default LoginWithOthers;