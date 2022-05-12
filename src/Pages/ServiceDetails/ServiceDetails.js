import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ServiceDetails = () => {
    const {serviceId} = useParams({});
    return (
        
        <div>
            <h1>this is service page :{serviceId} </h1>
            <Link to='/checkout' ><button className='btn btn-primary text-center'>process to checkout</button></Link>
        </div>
    );
};

export default ServiceDetails;