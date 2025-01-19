import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import { MdFoodBank } from 'react-icons/md';
import { IoMdMenu } from 'react-icons/io';
import { useSidebarContext } from '../../context/sidebarContext';
import { FaBell } from 'react-icons/fa';
import selectedWinnerAvatar from './download (1).jpg';

const Navbar = () => {
  const { openSidebar } = useSidebarContext();
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className={`navbar bg-orange flex align-center ${scrolled ? 'scrolled' : ''}`}>
      <div className="container w-100">
        <div className="navbar-content text-white">
          <div className="brand-and-toggler flex align-center justify-between">
            <Link to="/" className="navbar-brand fw-3 fs-22 flex align-center">
              <MdFoodBank />
              <span className="navbar-brand-text fw-7">James Thew</span>
            </Link>
            <div className="navbar-btns flex align-center">
              <Link to="/reciperecipe" className="login-btn text-white fw-6 fs-16">
                Recipe
              </Link>
              <Link to="/compecompe" className="login-btn text-white fw-6 fs-16">
                Competition
              </Link>
              <Link to="/login" className="login-btn text-white fw-6 fs-16">
                Login
              </Link>
              {/* <button type="button" className="navbar-show-btn text-white" onClick={() => openSidebar()}>
                <IoMdMenu size={27} />
              </button>  */}
              <button onClick={toggleModal} className="login-btn text-white fw-6 fs-16">
                <FaBell size={20} style={{ marginRight: '8px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h2>Winner Announcement</h2>
      <div className="winner-info">
        <img src={selectedWinnerAvatar} alt="Avatar" className="winner-avatar" />
        <p>Congratulations to the contest winner!:________ !</p>  
      </div>
      <button onClick={toggleModal}>Close</button>
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;
