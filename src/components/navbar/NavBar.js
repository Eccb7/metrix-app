import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronLeft, BsMic, BsGear } from 'react-icons/bs';
import './navbar.css';

function NavBar() {
  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <li>
          <Link to="/">
            <BsChevronLeft />
          </Link>
          2023
        </li>
        <li className="navbar-center">
          My Games
        </li>
        <li className="navbar-icons">
          <BsMic />
          <BsGear />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
