import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shifa Medical & Lab</h1>
        <NavBar></NavBar>
      </div>
    </header>
  );
};

export default Header;