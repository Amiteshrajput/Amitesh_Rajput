import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FaAngellist } from 'react-icons/fa'
import { Tooltip } from '@mui/material';
import { IconContext } from "react-icons";


import {BsFacebook} from 'react-icons/bs'
import {MdOutlineEmail} from "react-icons/md"
import {IoLogoYoutube} from "react-icons/io5"
import {GrInstagram} from "react-icons/gr"
import {RiWhatsappFill} from "react-icons/ri"
import {IoCallSharp} from "react-icons/io5"

import './footer.css';

const Footer = () => {
  return (
    <footer>
      <a href="#home" className="footer__logo">AMITESH RAJPUT</a>
      <ul className="permalinks">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Skills</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="footer__socials">
      <GetIcons Title="Amiteshrajput9@Gmail.Com" href="mailto:Amiteshrajput9@Gmail.Com" icon={<MdOutlineEmail/>} />
       

       <GetIcons Title="Youtube" href="https://youtube.com/channel/UCwgkfCO5VTTmIylTmzqD6Lw" icon={<IoLogoYoutube/>} />
       
       <GetIcons Title="Instagram" href="https://www.instagram.com/amiteshrajput7/" icon={<GrInstagram/>} />
 
      
       <GetIcons Title="Whatsapp" href="https://api.whatsapp.com/send/?phone=918707646972&text&type=phone_number&app_absent=0"
        icon={<RiWhatsappFill/>} />
 
       <GetIcons Title="Facebook" href='https://www.facebook.com/amitesh.rajput.165' icon={<BsFacebook/>} />
 
       <GetIcons Title="Mobile Number:+918707646972" href="tel:+918707646972" icon={<IoCallSharp/>} />
     
    </div>
      <div className="footer__copyright">
        <small>&copy; All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer


const tooltipTop = {
  "& Tooltip": {
    border: "solid skyblue 1px",
    color: "red"
  }
};


 function GetIcons({Title,href,icon}){
  console.log(Title,href)
    return(
  <Tooltip title={Title} placement="top" sx={tooltipTop}>
  
  <a href={href}  target="_blank" rel="noreferrer">
    
  <IconContext.Provider value={{ size:22}}> {icon}</IconContext.Provider>
  </a></Tooltip>
    )
  }