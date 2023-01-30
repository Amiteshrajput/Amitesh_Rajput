import React from 'react';
import CTA from './CTA';
import HeaderSocials from './HeaderSocials';
import './Header.css';


const Header = ({
  name ,profession,image
}) => {



  return (
    <header id="home">
       <div className="aboutMe">
           <img src={image} alt="me" />
       </div>

      <div className="container header__container">
      
     

        <h5>Hi, Myself </h5>
        <h1> {name}</h1>
        <h5 className="text-light">
          
          {profession}
          </h5>
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
