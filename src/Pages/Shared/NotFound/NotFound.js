import React from 'react';
import NotFoundImg from '../../../images/notfound.jpg';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='text-center'>
            <h1>
                Machanic is Sleeping...😂
            </h1>
            <img className='notfound-img' src={NotFoundImg} alt="" />
        </div>
    );
};

export default NotFound;