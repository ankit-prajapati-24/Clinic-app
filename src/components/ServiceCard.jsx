import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-blue-600">{service.name}</h2>
      <p className="mt-2 text-gray-700">{service.description}</p>
    </div>
  );
};

export default ServiceCard;