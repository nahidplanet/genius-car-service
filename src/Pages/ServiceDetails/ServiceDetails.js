import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import useServiceDetails from '../../hooks/useServiceDetails';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../firebase/firebase.init"
import axios from 'axios';
import { toast } from 'react-toastify';


const ServiceDetails = () => {
    const { serviceId } = useParams({});
    const [user, loading] = useAuthState(auth);
    const [service, setService] = useServiceDetails(serviceId);

    const [userForm, setUserForm] = useState({
        name: "nahid hasan",
        email: "sk@gmail.com",
        address: "fotepur Harinakundu jhenaidah",
        phone: "01791170258"
    })

    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    // console.log(errors);
    // const handleNeme = (e) => {
    //     const newName = e.target.value;
    //     const { name, ...rest } = userForm;
    //     const newUser = { name: newName, ...rest };
    //     setUserForm(newUser);
    // }
    const handleOrder = (e) => {
        e.preventDefault();
        const order = {
            productId: serviceId,
            name: user?.displayName,
            email: user?.email,
            serviceName: service?.name,
            price: service?.price,
            address: e.target.address.value,
            phone: e.target.phone.value

        }
        const url = `https://stark-oasis-12721.herokuapp.com/order`;
        // fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify(order)
        // })
        // .then(res => res.json())
        // .then(data => console.log(data));
        axios.post(url,order)
        .then(res=>{
            if (res.data.insertedId) {
                toast("order save")
                e.target.reset();
            }
        })
        
    }
    return (

        <div>
            <h1 className='text-center mt-5'>Your Information:{service?.name} </h1>
            <h1 className='text-center mt-5'>form one : using object with useState </h1>
            <div>
                <div className='text-center mt-3'>
                    {/* <form >
                        <input defaultValue={userForm.name} onChange={handleNeme}  className='mb-2 px-2 w-25 py-2 border-1 rounded' type="text" name="name" id="name" placeholder='Name' />
                        <br />
                        <input defaultValue={userForm.email}  className='mb-2 px-2 w-25 py-2 border-1 rounded' type="email" name="email" id="email" placeholder='Email' />
                        <br />
                        <input defaultValue={userForm.address}  className='mb-2 px-2 w-25 py-2 border-1 rounded' type="text" name="address" id="address" placeholder='Address' />
                        <br />
                        <input defaultValue={userForm.phone}  className='mb-2 px-2 w-25 py-2 border-1 rounded' type="number" name="phone" id="phone" placeholder='Phone' />
                        <br />
                        <input type="submit" value="Confirm" />
                    </form> */}
                </div>

                <h2 className='my-5 text-center'>form two : using firebase auth</h2>


                <div className='text-center'>
                    <form onSubmit={handleOrder}>
                        <input autoComplete='off' value={user?.displayName} className='mb-2 px-2 w-25 py-2 border-1 rounded' type="text" name="name"  placeholder='Name' readOnly />
                        <br />
                        <input value={user?.email} className='mb-2 px-2 w-25 py-2 border-1 rounded' type="email" name="email"  placeholder='Email' readOnly />
                        <br />
                        <input defaultValue={service?.name}  className='mb-2 px-2 w-25 py-2 border-1 rounded' type="text" name="productName"  placeholder='Product Name' readOnly />
                        <br />
                        <input defaultValue={service?.price}  className='mb-2 px-2 w-25 py-2 border-1 rounded' type="text" name="productPrice"  placeholder='Product Price' readOnly />
                        <br />
                        <input  className='mb-2 px-2 w-25 py-2 border-1 rounded' type="text" name="address"  placeholder='Address' required />
                        <br />
                        <input  className='mb-2 px-2 w-25 py-2 border-1 rounded' type="number" name="phone"  placeholder='Phone' required />
                        <br />
                        <input type="submit" value="Confirm" />
                    </form>
                </div>


            </div>
            <Link to='/checkout' ><button className='btn btn-primary text-center'>process to checkout</button></Link>
        </div>
    );
};

export default ServiceDetails;