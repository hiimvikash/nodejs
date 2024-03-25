import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };



  // Conditional rendering
  const { pathname } = useLocation()

  let goDashButton = null
    if (pathname !== '/dash') {
        goDashButton = (
          <li className="nav__item">
            <NavLink to="/dash" className="nav__link" onClick={closeMenuOnMobile}>
              Dashboard
            </NavLink>
          </li>
        )
    }
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="nav__logo">
          Notefy
        </NavLink>

        <div
          className={`nav__menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            
            {goDashButton}

            <li className="nav__item">
              <NavLink
                to="#"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                Logout
              </NavLink>
            </li>
            {/* <li className="nav__item">
              <NavLink
                to="/about-us"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                About Us
              </NavLink>
            </li> */}
            {/* <li className="nav__item">
              <NavLink
                to="/favorite"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                Favorite
              </NavLink>
            </li> */}
            {/* <li className="nav__item">
              <NavLink
                to="/location"
                className="nav__link"
                onClick={closeMenuOnMobile}
              >
                ....
              </NavLink>
            </li> */}
            <li className="nav__item">
              <NavLink to="#" className="nav__link nav__cta" onClick={closeMenuOnMobile}>
                Vikash Gupta
              </NavLink>
            </li>
          </ul>
          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;