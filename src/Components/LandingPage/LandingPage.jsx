import React, { useContext, useEffect, } from 'react'
import Header from "./Header/Header"
import Topbar from "./topbar/Topbar"
import Intro from "./intro/Intro"
import Contact from "./contact/Contact"
import Footer from "./footer/Footer"
import PhotoGallary from './PhotoGallary/PhotoGallary'
import KAYOUYoutubePlayer from './YoutubePlayer/YoutubePlayer'
import YouTubeADD from './YouTubeADD/YouTubeADD'
import WPandCall from './WPandCall/WPandCall'
import { db } from '../../firebaseConfig/firebaseConfig'
import { collection,  onSnapshot, query, where } from 'firebase/firestore';
import PLANS from './PLANS/PLANS'
import LiveEvent from './LiveEvent/LiveEvent'
import YoutubeTestimonials from './YouTubeTestimonials/Testimonials'
import { UserContext } from '../../Contexts/UserContext'


function LandingPage() {
  const [state,dispatch]=useContext(UserContext)


  const [adminInfo,setAdminInfo]=React.useState()


  const fetchAdminInfo=async()=>{ 

    const q = query(collection(db, "usersData"),where('email','==',''));
    onSnapshot(q, (querySnapshot) => {
       let adminData ={}
      querySnapshot.forEach((doc) => {
        adminData={...doc.data()}
        // console.log(doc.data())
      });

      // console.log(adminData)
    setAdminInfo(adminData)
   
    });

  
  }


React.useEffect(()=>{fetchAdminInfo()},[])

useEffect(()=>{
    
  if(state.tour){
    let timeout=setTimeout(()=>{
      window.location.assign('/#testimonials')
      setTimeout(()=>{
        window.location.assign('/#about')
        setTimeout(()=>{
          window.location.assign('/#plan')
          setTimeout(()=>{
            window.location.assign('/#contact')
            setTimeout(()=>{
              dispatch({type:'SET_Tour',payload:false})
              setTimeout(()=>{clearTimeout(timeout)},0)
            },0)
          },600000)
        },120000) 
      },180000)   //3min
    },5000)   //3sec
  }
},[])




 
  return (
    <>
    {adminInfo?<div >
      <Header image={adminInfo?.headerImage?.src} 
      name={adminInfo?.name} 
      profession={adminInfo?.profession}/>
      <Topbar/>
      <Intro image={adminInfo?.aboutMeImage?.src} 
      about= {adminInfo?.about} 
      commitment1={adminInfo?.commitment1}
      commitment2={adminInfo?.commitment2}
      commitment3={adminInfo?.commitment3}
      commitment4={adminInfo?.commitment4} />
      {/* <Experience /> */}
      <KAYOUYoutubePlayer embedId={adminInfo?.introVideo?.split("").splice(adminInfo?.introVideo.lastIndexOf("/")+1).join("")} />
      <YouTubeADD/>
      <WPandCall/>
      <YoutubeTestimonials testimonials={adminInfo?.testimonials}/>
      <PLANS 
      planheading1={adminInfo?.planheading1}
      planheading2={adminInfo?.planheading2}
      plannote={adminInfo?.plannote}
      plantext1={adminInfo?.plantext1}
      plantext2={adminInfo?.plantext2}
      plantext3={adminInfo?.plantext3}
      plantext4={adminInfo?.plantext4}
      plantext5={adminInfo?.plantext5}
      AdmininfoPlan={adminInfo?.plans}
      />
     <PhotoGallary photogallery={adminInfo?.photoGallery}/>
     
      <Contact />
      <Footer />
      <LiveEvent   />
     </div>:<h1 style={{textAlign:'center',color:"orange"}}>Loading...</h1>}</>
  )
}
export default LandingPage