import React, { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS JS

const OurTeam = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Dr. L. Nirmala",
      specialization: "Gynecologist",
      img: "https://static.wixstatic.com/media/0856dd_986a6cc1de714ad1bfe308daac632b57~mv2.png/v1/fill/w_244,h_338,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_2519_HEIC.png"
    },
    {
      name: "Dr. Kumbooru Govinda Rao",
      specialization: "Diabetologist and thyroid specialist",
      img: "https://static.wixstatic.com/media/0856dd_126631e7a3e0404dbea9286e18f49116~mv2.png/v1/fill/w_244,h_338,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_2554_HEIC.png"
    },
    {
      name: "Dr. S.M.A. Samee",
      specialization: "General Physician",
      img: "https://static.wixstatic.com/media/0856dd_ec78bab4b99741eb8ed924f36583d4d4~mv2.png/v1/fill/w_244,h_338,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_2533_HEIC.png"
    },
    {
      name: "Dr. MD. Niaz Ahmed",
      specialization: "Dermatologist",
      img: "https://static.wixstatic.com/media/11062b_01b19c342ce049c9a4ae41843f1723ed~mv2.jpeg/v1/fill/w_244,h_338,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0-04.jpeg"
    },
    {
      name: "Dr. Arshiya Siddiqua",
      specialization: "Hijama Therapy",
      img: "https://static.wixstatic.com/media/11062b_4be10d6010fb42a0a076bc16f0e9c42d~mv2.jpg/v1/fill/w_244,h_338,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0-05.jpg"
    }
  ];
  

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-blue-900">Our Team</h2>
          <p className="text-lg text-gray-600 mt-2">
            Meet our dedicated team of professionals.
          </p>
        </div>

        {/* Team Members Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 w-1 h-full bg-sky-300 transform -translate-x-1/2" data-aos="fade-up"></div>

          {/* Team Members List */}
          <div className="space-y-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                data-aos="fade-up"
                data-aos-delay={index * 100} // Staggered delay for each card
              >
                {/* Team Member Image */}
                <div className="w-1/2 p-6">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full max-h-88  h-full object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Team Member Details */}
                <div className="w-1/2 p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;