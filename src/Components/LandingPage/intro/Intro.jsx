import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { FaAward } from 'react-icons/fa';
import { VscFolderLibrary } from 'react-icons/vsc';
import { db } from '../../../firebaseConfig/firebaseConfig';
import ME from '../assets/me.jpg';
import './intro.css';

const Intro = () => {


  const admin=JSON.parse(sessionStorage.getItem('admin'))

  const [adminInfo,setAdminInfo]=React.useState({
    name:'',
    about:''
  })


  const fetchAdminInfo=async()=>{
    const docRef = doc(db, "usersData", 'it145zGVbxyLdl4DFOQh');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
       console.log("Document data: from header", docSnap.data());
      setAdminInfo(docSnap.data())
      // setLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  useEffect(()=>{fetchAdminInfo()},[])









  return (
    <section id="about">
      <h5>Get to know</h5>
      <h2>About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img  
            height='20%'
            src={adminInfo.aboutmeImage}
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
            {adminInfo.about}
            </p>
           
            <p style={{textAlign:"justify",color:"white"}}>
              <b> {adminInfo.commitment1}
                {/* I can be a full stop of your search as a mentor for 
            your success in NETWORK MARKETING 2.0 with my unique & practical strategies to achieve your goals */}
            </b></p>

      <p style={{textAlign:"justify"}}>
        <b>{adminInfo.commitment2}
          {/* I can be a full stop of your search as a mentor for your
       success in Network Marketing business with my unique & practical strategies to achieve your goals. */}
       </b></p>

       <p style={{color:"white"}}>{adminInfo.commitment3}
        {/* *No fake motivation only Education with fact and calculation. */}
        </p>
       
       <p style={{color:"white"}}>{adminInfo.commitment4}
        {/* *No fake commitment only truth. */}
        </p>

          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default Intro