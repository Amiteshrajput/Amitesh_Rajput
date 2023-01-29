import React from 'react'
import Header from "./Header/Header"
import Topbar from "./topbar/Topbar"
import Intro from "./intro/Intro"
import Experience from "./experience/Experience"
import Portfolio from "./portfolio/Portfolio"
import Testimonials from "./testimonials/Testimonials"
import Contact from "./contact/Contact"
import Footer from "./footer/Footer"
import PhotoGallary from './PhotoGallary/PhotoGallary'


import KAYOUYoutubePlayer from './YoutubePlayer/YoutubePlayer'


function LandingPage() {
 
  return (
    <div >
      <Header />
      <Topbar/>
      <Intro />
      {/* <Experience /> */}
      <KAYOUYoutubePlayer/>
     <PhotoGallary/>
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
     
    </div>
  )
}
export default LandingPage