
import React, { useEffect } from 'react';
import { FaAward } from 'react-icons/fa';
import { VscFolderLibrary } from 'react-icons/vsc';

import './intro.css';

const Intro = ({image,about
,commitment1,commitment2,commitment3,commitment4}) => {


  return (
    <section id="about">
      <h5>Get to know</h5>
      <h2>About Me</h2>
      <br/>
      <br/>
      <br />
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img  
            height='20%'
            src={image}
            // src="https://i0.wp.com/1.bp.blogspot.com/-aFF7OKdfiTQ/YCaVT4OXGzI/AAAAAAAAQjE/n-eIG8YMRoIsBtupxFBCJxhnq3cANb4_wCNcBGAsYHQ/s16000/IMG-5444.JPG?w=1200&ssl=1" 
           

           alt="me" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            {/* <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>1 year</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>20+ Completed Projects</small>
            </article> */}
          </div>
          <p style={{textAlign:"justify"}}>
            {/* Networker by profession & engineer by education.
          I have 1 year of working experience in awpl. Before joining engineering college 
            I got chance to study in Jawahar Navodaya Vidyalaya for 7 Years 
            and I always feel proud as a part of JNV. */}
            {about}
            </p>
           
            <p style={{textAlign:"justify",color:"white"}}>
              <b> 
                {commitment1}
                {/* I can be a full stop of your search as a mentor for 
            your success in NETWORK MARKETING 2.0 with my unique & practical strategies to achieve your goals */}
            </b></p>

      <p style={{textAlign:"justify"}}>
        <b>
          {commitment2}
          {/* I can be a full stop of your search as a mentor for your
       success in Network Marketing business with my unique & practical strategies to achieve your goals. */}
       </b></p>

       <p style={{color:"white"}}>
        {commitment3}
        {/* *No fake motivation only Education with fact and calculation. */}
        </p>
       
       <p style={{color:"white"}}>
        {commitment4}
        {/* *No fake commitment only truth. */}
        </p>

          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default Intro
