import React from 'react';
import CTA from './CTA';
import HeaderSocials from './HeaderSocials';
import './Header.css';
import { db } from '../../../firebaseConfig/firebaseConfig'; 
import { useEffect } from 'react';
import { doc,getDoc } from 'firebase/firestore';


const Header = () => {
  const admin=JSON.parse(sessionStorage.getItem('admin'))

  const [adminInfo,setAdminInfo]=React.useState({
    name:'',
    about:''
  })


  const fetchAdminInfo=async()=>{
    const docRef = doc(db, "usersData", 'it145zGVbxyLdl4DFOQh');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
     //  console.log("Document data: from header", docSnap.data());
      setAdminInfo(docSnap.data())
      // setLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  useEffect(()=>{fetchAdminInfo()},[])



  return (
    <header id="home">
       <div className="aboutMe">
           <img src="https://i0.wp.com/1.bp.blogspot.com/-aFF7OKdfiTQ/YCaVT4OXGzI/AAAAAAAAQjE/n-eIG8YMRoIsBtupxFBCJxhnq3cANb4_wCNcBGAsYHQ/s16000/IMG-5444.JPG?w=1200&ssl=1" alt="me" />
       </div>

      <div className="container header__container">
      
     

        <h5>Hi, Myself </h5>
        <h1> {adminInfo.name}</h1>
        <h5 className="text-light">
          
          {adminInfo.profession}
          </h5>
        <CTA />
        <a href="#contact" className="scroll__down">
          Scroll Down
        </a>
        <HeaderSocials />
      </div>
    </header>
  );
};

export default Header;
