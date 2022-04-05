import React, { useState, useEffect } from 'react';

import './style.scss';

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div className={`navbar ${show && 'navbar__black'}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        className="navbar__logo"
      />
    </div>
  );
}

export default Navbar;
