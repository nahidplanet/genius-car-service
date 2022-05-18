import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import auth from '../../../firebase/firebase.init';
import Loading from '../Loading/Loading';
import 'react-toastify/dist/ReactToastify.css';

const RequireAuth = ({ children }) => {
  let [user, loading, error] = useAuthState(auth);
  let location = useLocation();
  const [sendEmailVerification, sending, errorVerify] = useSendEmailVerification(auth)
  if (loading) {
    return <Loading></Loading>;
  }
  if (error) {
    console.log(error?.message);
  }
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!user.emailVerified) {
    return <div>
      <h1>Your Email Not Verified</h1>
      <p>go to your email and verify</p>
      <button
        onClick={async () => {
          await sendEmailVerification();
          toast('Sent email');
        }}
      >Resend </button>
      <ToastContainer></ToastContainer>
    </div>
  }
  return children;
};

export default RequireAuth;