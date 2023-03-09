import React, { useCallback, useEffect, useState } from 'react'

// import Carousel, { Modal, ModalGateway } from "react-images";
// import { db } from '../../../firebaseConfig/firebaseConfig';
import "./PhotoGallary.css"
// import { doc, getDoc } from 'firebase/firestore';
import {GrClose} from "react-icons/gr"


const PhotoGallary = ({photogallery}) => {

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const [show,setShow]=useState("none")
  const [SRC,setSRC]=useState('')

  // footer: (base, state) => {
  //   const opacity = state.interactionIsIdle ? 0 : 1;
  //   const transition = 'opacity 300ms';

 function openLightbox({item,index}){
  //console.log(item.src)
  setShow("")
  setSRC(item.src)
 }


  return (
    <div  className='Mainbox'>
      <div className='photogallary'>
        <h3>Photo Gallary</h3>
      </div>
      
        <div className='photosCards' >
          {
            photogallery?.map((item,index)=>{
   
       
      return <div className='card' key={item.src} onClick={()=>{
      openLightbox({item,index})}}>
      <img className='card'  width="100%" height='100%'  
      src={item.src}/>
     

      </div>
       
    })
  }
  </div>

  <ShowImage src={SRC} display={show} setShow={setShow}/>
  
  
      </div>
  )
}

export default PhotoGallary



function ShowImage({src,display,setShow}){
  
  console.log(src,"display",display)

  return (< div className="ShowImageBox" style={{display:`${display}`}}>
  <button className="ShowImagebtn" onClick={()=>setShow("none")} >
   
    Close</button>
  <img className="imgofshow" src={src}  />
  </div>)
}