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
import YouTubeADD from './YouTubeADD/YouTubeADD'
import WPandCall from './WPandCall/WPandCall'
import { db } from '../../firebaseConfig/firebaseConfig'
import { doc,getDoc } from 'firebase/firestore';


function LandingPage() {



  const [adminInfo,setAdminInfo]=React.useState()


  const fetchAdminInfo=async()=>{
    const docRef = doc(db, "usersData", 'it145zGVbxyLdl4DFOQh');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
       console.log("Document data: from landing", docSnap.data());
      setAdminInfo(docSnap.data())
      // setLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


React.useEffect(()=>{fetchAdminInfo()},[])

 
  return (
    <>
    {adminInfo?<div >
      <Header image={adminInfo.headerImage.src} 
      name={adminInfo.name} 
      profession={adminInfo.profession}/>
      <Topbar/>
      <Intro image={adminInfo.aboutMeImage.src} 
      about= {adminInfo.about} 
      commitment1={adminInfo.commitment1}
      commitment2={adminInfo.commitment2}
      commitment3={adminInfo.commitment3}
      commitment4={adminInfo.commitment4} />
      {/* <Experience /> */}
      <KAYOUYoutubePlayer embedId={adminInfo?.introVideo?.split("").splice(adminInfo?.introVideo.lastIndexOf("/")+1).join("")} />
      <YouTubeADD/>
      <WPandCall/>
     <PhotoGallary photogallery={adminInfo?.photoGallery}/>
      {/* <Portfolio />
      <Testimonials /> */}
      <Contact />
      <Footer />
     </div>:<h1>Loading...</h1>}</>
  )
}
export default LandingPage
