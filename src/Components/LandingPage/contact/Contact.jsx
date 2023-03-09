import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MdOutlineEmail } from 'react-icons/md';


import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FaAngellist } from 'react-icons/fa'
import {BsFacebook} from 'react-icons/bs'
import {IoLogoYoutube} from "react-icons/io5"
import {GrInstagram} from "react-icons/gr"
import {RiWhatsappFill} from "react-icons/ri"
import {IoCallSharp} from "react-icons/io5"





import './contact.css';

const Contact = () => {
  const [message, setMessage] = useState(false);
  const formRef = useRef();
  const [userEmail,setUserEmail] = useState();
  // const [userName,setUserName] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
    emailjs.sendForm(
        'service_tfafgyp',
        'template_hdo6468',
        formRef.current,
        '7hfslBOUkNApcUA_z'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };
  return ( 
    <section id="contact">
      <h5>Get In Touch</h5>
      <h5>
        I do receive your messages and will respond asap if the valid email is
        provided :)
      </h5>
      <h2>Contact Me</h2>
      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon" />
            <h4>Email</h4>
            <h5>Amiteshrajput9@Gmail.Com</h5>
            <a href="mailto:Amiteshrajput9@Gmail.Com">Send a message</a>
          </article>

          <article className="contact__option">
            <RiWhatsappFill className="contact__option-icon" />
            <h4>Whatsapp</h4>
            <h5>+918707646972</h5>
            <a target="_blank" href="https://api.whatsapp.com/send/?phone=918707646972&text&type=phone_number&app_absent=0">Send a message</a>
          </article>

          {/* <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon" />
            <h4>Email</h4>
            <h5>Amiteshrajput9@Gmail.Com</h5>
            <a href="mailto:Amiteshrajput9@Gmail.Com">Send a message</a>
          </article> */}
        </div>
        <form ref={formRef} 
        onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your Full Name"
            name="user_name"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            name="from_email"
            value={userEmail}
            onChange={(e)=>setUserEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your message"
            rows="7"
            name="message"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
          {message && <span>Thanks, I'll reply ASAP :)</span>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
