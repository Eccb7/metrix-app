import React from 'react';
import { Link } from 'react-router-dom';
import { FaGear, FaMicrophone, FaLessThan } from 'react-icons/fa6';
import './navbar.css';

function NavBar() {
  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <li>
          <Link to="/">
            <FaLessThan />
          </Link>
          2023
        </li>
        <li className="navbar-center">
          My Games
        </li>
        <li className="navbar-icons">
          <FaMicrophone />
          <FaGear />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
