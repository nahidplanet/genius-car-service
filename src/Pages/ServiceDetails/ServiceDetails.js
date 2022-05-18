import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ServiceDetails = () => {
    const { serviceId } = useParams({});
    const [service, setService] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/service/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, []);
    // console.log();
    return (

        <div>
            <h1>this is service page :{service.name} </h1>
            <Link to='/checkout' ><button className='btn btn-primary text-center'>process to checkout</button></Link>
        </div>
    );
};

export default ServiceDetails;