import React from 'react';

const TeamMember = ({ member }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <img src={`/images/${member.image}`} alt={member.name} className="w-full h-48 object-cover rounded-lg" />
      <h2 className="text-xl font-bold text-blue-600 mt-4">{member.name}</h2>
      <p className="mt-2 text-gray-700">{member.specialization}</p>
    </div>
  );
};

export default TeamMember;