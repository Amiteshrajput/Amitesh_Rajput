import React from 'react'
import Header from "./header/Header"
import Topbar from "./topbar/Topbar"
import Intro from "./intro/Intro"
import Experience from "./experience/Experience"
import Portfolio from "./portfolio/Portfolio"
import Testimonials from "./testimonials/Testimonials"
import Contact from "./contact/Contact"
import Footer from "./footer/Footer"
import PhotoGallary from './PhotoGallary/PhotoGallary'
import "./LandingPage.css"


function LandingPage() {
 
  return (
    < >
      <Header />
      <Topbar/>
      <Intro />
      <Experience />
     
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
     

     
    </>
  )
}

export default LandingPage