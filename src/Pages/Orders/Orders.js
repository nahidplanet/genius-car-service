import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase/firebase.init';

const Orders = () => {
  const [orders, setOrders] = useState();
  const [user] = useAuthState(auth);
  // const email = user?.email;
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const email = user?.email;
      const url = `https://stark-oasis-12721.herokuapp.com/order?email=${email}`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            authorization: `Beare ${localStorage.getItem('accessToken')}`
          }
        });
        setOrders(data);
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate('/login');
        }
      }
    }
    getOrders();
  }, [user]);


  // console.log(orders);
  return (
    <div>
      <h1>orders Page = {orders?.length}</h1>
    </div>
  );
};

export default Orders;