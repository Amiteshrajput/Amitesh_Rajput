import React, {  useState } from 'react'

import "./PhotoGallary.css"


const PhotoGallary = ({photogallery}) => {


  const [show,setShow]=useState("none")
  const [SRC,setSRC]=useState('')

 
 function openLightbox({item,index}){
  //console.log(item.src)
  setShow("")
  setSRC(item.src)
 }


  return (
    <div  className='Mainbox'>
      <div className='photogallary'>
        <h3>Photo Gallery</h3>
      </div>
      
        <div className='photosCards' >
          {
            photogallery?.map((item,index)=>{
   
       
      return <div className='card' key={item.src} onClick={()=>{
      openLightbox({item,index})}}>
      <img className='card'  width="100%" height='100%'  alt="photogallary"
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
  
  // console.log(src,"display",display)

  return (< div className="ShowImageBox" style={{display:`${display}`}}>
  <button className="ShowImagebtn" onClick={()=>setShow("none")} >
   
    Close</button>
  <img className="imgofshow" src={src} alt="showimg" />
  </div>)
}