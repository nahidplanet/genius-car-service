import React, { useEffect, useState } from 'react';

const useService = () => {
  const [services,setServices] = useState([]);
  useEffect(()=>{
    fetch(`https://stark-oasis-12721.herokuapp.com/service/`)
    .then(res=>res.json())
    .then(data=>setServices(data))

  },[])
  return [services,setServices];
};

export default useService;