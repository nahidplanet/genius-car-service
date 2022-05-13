import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { useNavigate } from 'react-router-dom';




const ForgetPassword = ({email}) => {
    let navigate = useNavigate();

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const forgetPassword = () => {
        sendPasswordResetEmail(email);
    }

    const navigateRagister = () => {
        navigate('/register');
    }
    return (
        <div>
            <span onClick={forgetPassword} className='forget text-bold text-primary'>Forget Password? </span>
            <span onClick={navigateRagister} className="text-danger" style={{ cursor: 'pointer' }}>Go to Register</span>
        </div>
    );
};

export default ForgetPassword;