import React from 'react';
import useService from '../../hooks/useService';
import PageTitle from '../Shared/PageTitle/PageTitle';

const ManageService = () => {
  const [services, setServices] = useService();
  const handleServiceDelete = (id) => {
    const procced = window.confirm("are you sure to delete?");
    if (procced) {
      const url = `http://localhost:5000/service/${id}`;
      fetch(url, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          const rest = services.filter (service=>service._id !== id);
          setServices(rest);
          console.log(data);

        })
    }
    // console.log(id);

  }
  return (
    <div>
      <PageTitle title={'Delete'}></PageTitle>

      <h1>Manage Service</h1>
      {
        services.map(service => <div key={service._id}>
          <h5>{service.name} <button onClick={() => handleServiceDelete(service._id)}>x</button></h5>
        </div>)
      }
    </div>
  );
};

export default ManageService;