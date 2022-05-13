import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loading.css'

const Loading = () => {
    return (
        <div className='spiner-loading'>
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default Loading;