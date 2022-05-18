import React from 'react';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Service.css'

const Service = ({ service }) => {
    const navigate = useNavigate();
    const handleServiceDetails = (id) => {
        navigate(`/service/${id}`);
    }
    return (
        <Col xs={12} sm={12} md={6} lg={4}>
            <div className='service text-center g-5'>
                <div className="serviceImage">
                    <img className='' src={service.img} alt="" />
                </div>
                <h3 className='mt-2'>{service.name}</h3>
                <h5>Price: {service.price}$</h5>
                <p>{service.description}</p>
                <button onClick={()=> handleServiceDetails(service._id)} className='btn btn-primary text-center'>Books : {service.name}</button>
            </div>
        </Col>


    );
};

export default Service;