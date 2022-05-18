import React from 'react';
import { useForm } from "react-hook-form";
import PageTitle from '../Shared/PageTitle/PageTitle';

const AddService = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    
    fetch(`http://localhost:5000/service`,{
      method:"POST",
      headers:{
        "content-type":"Application/json"
      },
      body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(result => console.log(result))
  };
  return (
    <div className='w-25 mx-auto'>
      <PageTitle title={'Add User'}></PageTitle>
      
      <h1>plase add service</h1>
      <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
        <input className='mb-2' type={'text'} placeholder='Name' {...register("name", { required: true })} />
        <textarea className='mb-2'  placeholder='Description' {...register("description", { required: true })} />
        <input className='mb-2' type={'number'} placeholder='Price' {...register("price", { required: true })} />
        <input className='mb-2' type={'text'} placeholder='Image URL...' {...register("img", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" value={"Add Service"}/>
      </form>
    </div>
  );
};

export default AddService;