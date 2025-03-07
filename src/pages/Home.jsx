import React from 'react';
import HeroSection from './HeroSection';
import Blog from './Blog';
import KeyOfferingsPage from './KeyOfferignPage';
import OurTeam from './OurTeam';

const Home = () => {
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