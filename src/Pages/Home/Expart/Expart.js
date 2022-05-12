import React from 'react';
import { Col } from 'react-bootstrap';
import './Expart.css'
const Expart = ({ expert }) => {
    const { name, description, img } = expert;
    return (
        <Col xs={12} sm={12} md={6} lg={4} className=' '>
            <div className='expart text-center g-5'>
                <div className="exper-img">
                    <img className='img-fluid' src={img} alt="" />
                </div>
                <h3 className='mt-2'>{name}</h3>
                <p>{description}</p>
                <button type='button' className='btn btn-primary'>Go Profile</button>
            </div>
        </Col>
    );
};

export default Expart;