import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FaAngellist } from 'react-icons/fa'
import {BsFacebook} from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md';
import {IoLogoYoutube} from "react-icons/io5"
import {GrInstagram} from "react-icons/gr"
import {RiWhatsappFill} from "react-icons/ri"
import {IoCallSharp} from "react-icons/io5"
import { Tooltip } from '@mui/material';
import { IconContext } from "react-icons";


const HeaderSocials = () => {
  return (
    <div className="header__socials">
      <GetIcons Title="Amiteshrajput9@Gmail.Com" href="mailto:Amiteshrajput9@Gmail.Com" icon={<MdOutlineEmail/>} />
       

      <GetIcons Title="Youtube" href="https://youtube.com/channel/UCwgkfCO5VTTmIylTmzqD6Lw" icon={<IoLogoYoutube/>} />
      
      <GetIcons Title="Instagram" href="https://www.instagram.com/amiteshrajput7/" icon={<GrInstagram/>} />

     
      <GetIcons Title="Whatsapp" href="https://api.whatsapp.com/send/?phone=918707646972&text&type=phone_number&app_absent=0"
       icon={<RiWhatsappFill/>} />

      <GetIcons Title="Facebook" href='https://www.facebook.com/amitesh.rajput.165' icon={<BsFacebook/>} />

      <GetIcons Title="Mobile Number" href="tel:+918707646972" icon={<IoCallSharp/>} />
    
      {/* <a href="https://www.linkedin.com/in/meri-gogichashvili/" target="_blank" rel="noreferrer" ><BsLinkedin /></a> */}
      {/* <a href="https://github.com/Meri-MG" target="_blank" rel="noreferrer" ><FaGithub /></a> */}
      {/* <a href="https://angel.co/u/meri-gogichashvili" target="_blank" rel="noreferrer" ><FaAngellist /></a> */}
    </div>
  )
}

export default HeaderSocials



  function GetIcons({Title,href,icon}){
console.log(Title,href)
  return(
<Tooltip title={Title} placement="right-end" >

<a href={href}  target="_blank" rel="noreferrer">
  
<IconContext.Provider value={{ size:22}}> {icon}</IconContext.Provider>
</a></Tooltip>
  )
}