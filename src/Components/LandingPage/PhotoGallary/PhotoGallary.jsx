import React, { useCallback, useEffect, useState } from 'react'

import Carousel, { Modal, ModalGateway } from "react-images";
import { db } from '../../../firebaseConfig/firebaseConfig';
import "./PhotoGallary.css"
import { doc, getDoc } from 'firebase/firestore';

const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1
    },
    {
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/PpOHJezOalU/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
      width: 4,
      height: 3
    }
  ];
  
const PhotoGallary = () => {
    const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);


  const admin=JSON.parse(sessionStorage.getItem('admin'))

  const [adminInfo,setAdminInfo]=React.useState({
    name:'',
    about:''
  })


  const fetchAdminInfo=async()=>{
    const docRef = doc(db, "usersData", 'it145zGVbxyLdl4DFOQh');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
       //console.log("Document data:", docSnap.data());
      setAdminInfo(docSnap.data())
      // setLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  useEffect(()=>{fetchAdminInfo()},[])





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
    <div  className='mainbox'>
      <div className='name'>
        <h3>Photo Gallary</h3>
      </div>
      
        <div className='photosCards' >
          {
            adminInfo?.photogallery?.map((item,index)=>{
   
       
      return <div className='card' key={item.src} onClick={()=>{
      openLightbox(setViewerIsOpen(true),{item,index})}}>
      <img className='card'  width="100%" height='100%'  
      src={item.src}/></div>
       
    })
  }
  </div>

      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox} >
            <Carousel 
            styles={customStyles}
              currentIndex={currentImage}
              views={adminInfo?.photogallery?.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      </div>
  )
}

export default PhotoGallary


