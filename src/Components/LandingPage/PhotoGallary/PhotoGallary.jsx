import React, { useCallback, useEffect, useState } from 'react'

// import Carousel, { Modal, ModalGateway } from "react-images";
// import { db } from '../../../firebaseConfig/firebaseConfig';
import "./PhotoGallary.css"
// import { doc, getDoc } from 'firebase/firestore';

  
const PhotoGallary = ({photogallery}) => {
    const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);


  
 



  const openLightbox = useCallback((event, { photo, index }) => {
    
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const customStyles = {
  header: (base, state) => ({
     ...base,
     color:"red",
    // borderBottom: '1px dotted pink',
    color: state.isFullscreen ? 'red' : 'blue',
    padding: "5%",
  }),
  view: () => ({
    // none of react-images styles are passed to <View />
    height: "60%",
    margin:"auto",
    width: "60%",
  }),
 
  footer: (base, state) => {
    const opacity = state.interactionIsIdle ? 0 : 1;
    const transition = 'opacity 300ms';

    return { ...base, opacity, transition };
  }
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
      openLightbox(setViewerIsOpen(true),{item,index})}}>
      <img className='card'  width="100%" height='100%'  
      src={item.src}/></div>
       
    })
  }
  </div>

      {/* <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox} >
            <Carousel 
            styles={customStyles}
              currentIndex={currentImage}
              views={photogallery?.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway> */}
      </div>
  )
}

export default PhotoGallary


