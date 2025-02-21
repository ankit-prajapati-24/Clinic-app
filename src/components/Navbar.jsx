import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.avif";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import { setRole, setToken } from "../slices/UserDataSlice";

function NavBar() {
  const { token, UserData, role } = useSelector((state) => state.User);
  const [click, setClick] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userMenuRef = useRef(null); // Ref for detecting outside clicks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => setClick(!click);
  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  function handleLogout(){
    dispatch(setToken(null));
    dispatch(setRole(null));
    alert("Logout ");
    navigate("/login");
  }
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setRole,role]);

  return (
    <>
      <nav className="navbar ">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img
              src={logo}
              alt="Logo"
              className="mix-blend-multiply h-24 text-white"
            />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink exact to="/" className="nav-links" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Services"
                className="nav-links"
                onClick={handleClick}
              >
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/LabAndMedicalPage"
                className="nav-links"
                onClick={handleClick}
              >
                Lab And MedicalPage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/ContactUs"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Blogs"
                className="nav-links"
                onClick={handleClick}
              >
                Blogs
              </NavLink>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to={`${role == 'user'? "Dashboard":"admin-dashboard" }`}
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Dashboard
                  </NavLink>
                </li>

                {/* User Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <div
                    className="cursor-pointer rounded-full p-2 border bg-sky-500 text-white"
                    onClick={toggleDropdown}
                  >
                    { (token && token.substr(0,2))|| "An"}
                  </div>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-md p-2">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          console.log("Logging out...");
                          handleLogout();
                          
                          // Implement logout logic here
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/Login"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/Signup"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Hamburger Menu for Mobile */}
          <div
            className="md:hidden fixed top-5 right-4 bg-sky-500 text-white p-2 rounded-lg z-50"
            onClick={handleClick}
          >
            {click ? <HamburgetMenuOpen /> : <HamburgetMenuClose />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
