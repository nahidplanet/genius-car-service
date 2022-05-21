import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import useService from '../../../hooks/useService';
import Service from '../Service/Service';

const Services = () => {
    
    const [services,setServices] =useService();
    return (
        <Container id="services" >
            <h1 className='text-center text-primary my-5' >Our Service</h1>
            <Row className='g-5'>
                {
                    services.map(service => <Service key={service._id} service={service} ></Service>)
                }
            </Row>
        </Container>
    );
};

export default Services;