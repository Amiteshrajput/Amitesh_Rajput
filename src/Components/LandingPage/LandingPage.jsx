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
import { collection, doc,getDoc, onSnapshot, query, where } from 'firebase/firestore';
import PLANS from './PLANS/PLANS'
import LiveEvent from './LiveEvent/LiveEvent'


function LandingPage() {



  const [adminInfo,setAdminInfo]=React.useState()


  const fetchAdminInfo=async()=>{ 

    const q = query(collection(db, "usersData"),where('email','==',''));
    onSnapshot(q, (querySnapshot) => {
       let adminData ={}
      querySnapshot.forEach((doc) => {
        adminData={...doc.data()}
        console.log(doc.data())
      });

      // console.log(adminData)
    setAdminInfo(adminData)
    // setLoading(false)
    });
    // const docRef = doc(db, "usersData", '0SRf2rIzwoCdh1P0mrco');
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    //   setAdminInfo(docSnap.data())
    //   // setLoading(false)
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  
  }


React.useEffect(()=>{fetchAdminInfo()},[])

 
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
      {/* <Portfolio />
      <Testimonials /> */}
      <Contact />
      <Footer />
      <LiveEvent/>
     </div>:<h1>Loading...</h1>}</>
  )
}
export default LandingPage