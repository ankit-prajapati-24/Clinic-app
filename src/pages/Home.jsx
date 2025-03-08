import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import Blog from './Blog';
import KeyOfferingsPage from './KeyOfferignPage';
import OurTeam from './OurTeam';


const Home = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="container mx-auto ">
     <HeroSection></HeroSection>
     <KeyOfferingsPage></KeyOfferingsPage>
     <OurTeam></OurTeam>
     <Blog></Blog>
    </div>
  );
};

export default Home;