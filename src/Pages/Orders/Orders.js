import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';

const Orders = () => {
  const [orders,setOrders] = useState();
  const [user] = useAuthState(auth);
  const email = user?.email;

  useEffect(()=>{
    const getOrders = async () =>{
      const url = `http://localhost:5000/order?email=${email}`;
      const {data} = await axios.get(url);
      setOrders(data);
    }
    getOrders();
  },[email]);


// console.log(orders);
  return (
    <div>
      <h1>orders Page = {orders?.length}</h1>
    </div>
  );
};

export default Orders;