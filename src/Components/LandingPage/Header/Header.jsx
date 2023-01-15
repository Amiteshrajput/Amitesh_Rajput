import React from 'react';
import CTA from './CTA';
import HeaderSocials from './HeaderSocials';
import './Header.css';

const Header = () => {
  return (
    <header id="home">
      <div className="container header__container">
        <h5>Hi, Myself </h5>
        <h1> AMITESH RAJPUT</h1>
        <h5 className="text-light">Networker by profession & engineer by education .</h5>
        <CTA />
        <a href="#contact" className="scroll__down">
          Scroll Down
        </a>
        <HeaderSocials />
      </div>
    </header>
  );
};

export default Header;
