import React from 'react';
import TeamMember from '../components/TeamMember';

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. L. Nirmala",
      specialization: "Gynecologist",
      img: ""
    },
    {
      name: "Dr. Kumbooru Govinda Rao",
      specialization: "Diabetologist and thyroid specialist",
      img: ""
    },
    {
      name: "Dr. S.M.A. Samee",
      specialization: "General Physician",
      img: ""
    },
    {
      name: "Dr. MD. Niaz Ahmed",
      specialization: "Dermatologist",
      img: ""
    },
    {
      name: "Dr. Arshiya Siddiqua",
      specialization: "Hijama Therapy",
      img: ""
    }
  ];
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600">Our Team</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map(member => (
          <TeamMember key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Team;