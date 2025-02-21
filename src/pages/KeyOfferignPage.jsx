import React, { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS JS

const KeyOfferingsPage = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  // Key offerings data
  const offerings = [
    {
      title: "QUALITY CARE",
      description: "Our commitment to providing quality care is unwavering. From accurate diagnoses to personalized treatment plans, we ensure that every patient receives the attention and care they deserve.",
      img: "https://static.wixstatic.com/media/0856dd_ffa9c7c0d21648dfb58f8563e2171b2a~mv2.png/v1/fill/w_544,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0856dd_ffa9c7c0d21648dfb58f8563e2171b2a~mv2.png" // Replace with actual image path
    },
    {
      title: "ADVANCED TECHNOLOGY",
      description: "We stay at the forefront of medical technology to offer our patients the most advanced treatments and procedures. Our clinic is equipped with state-of-the-art facilities to ensure top-notch healthcare services.",
      img: "https://static.wixstatic.com/media/0856dd_6aeadf8b4def41fb82e1bd703c2984f5~mv2.png/v1/fill/w_525,h_399,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0856dd_6aeadf8b4def41fb82e1bd703c2984f5~mv2.png" // Replace with actual image path
    },
    {
      title: "PATIENT-CENTRIC APPROACH",
      description: "Putting our patients first is at the core of everything we do. We focus on building lasting relationships with our patients, understanding their unique needs, and providing compassionate care that exceeds expectations.",
      img: "https://static.wixstatic.com/media/0856dd_af11341401be4ae39839177fb786cdc2~mv2.png/v1/fill/w_525,h_356,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0856dd_af11341401be4ae39839177fb786cdc2~mv2.png" // Replace with actual image path
    }
  ];

  return (
    <div id="key-offerings" className="bg-gradient-to-r from-sky-50 to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-sky-700">Our Key Offerings</h2>
          <p className="text-lg text-gray-600 mt-2">Explore what we offer through our visual showcase.</p>
        </div>

        {/* Key Offerings Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          {/* <div className="absolute left-1/2 w-1 h-full bg-sky-300 transform -translate-x-1/2" data-aos="fade-up"></div> */}

          {/* Offerings List */}
          <div className="space-y-12">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                data-aos="fade-up"
                data-aos-delay={index * 100} // Staggered delay for each card
              >
                {/* Offering Image */}
                <div className=" h-full p-6">
                  <img
                    src={offering.img}
                    alt={offering.alt}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Offering Content */}
                <div className="w-1/2 p-6">
                  <h3 className="text-xl font-bold text-sky-700 mb-2">{offering.title}</h3>
                  <p className="text-gray-600">{offering.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyOfferingsPage;