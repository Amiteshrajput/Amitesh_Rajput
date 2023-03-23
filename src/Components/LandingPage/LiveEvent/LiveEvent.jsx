

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../../firebaseConfig/firebaseConfig';
import CountdownTimer from './CountdownTimer';
import "./ShiningBtn.css"
import './LiveEvent.css';
import YoutubeEmbed from '../YoutubePlayer/YoutubeEmbed';




export default function LiveEvent() {


  const [openModal,setopenModal]=useState(true)
  const [startTime,setTime]=React.useState('')
  const [EndTime,setEndTime]=React.useState('')
  const [ eventData ,setEventData]=useState({})

  const fetchAdminInfo=async()=>{ 

    const q2 = query(collection(db, "usersData"),where('formUrl','!=',''));
    onSnapshot(q2, (querySnapshot) => {
      
      querySnapshot.forEach((doc) => {
       setEventData({...doc.data()})
        // console.log(doc.data())
      });
        // console.log("eventData",eventData)
    // setLoading(false)
    });
    
  
  }


React.useEffect(()=>{fetchAdminInfo()},[])
// const [display,setDisplay]=useState("none")

useEffect(()=>{
    
    const myDate=eventData?.startTime

    const sdf= new Date(myDate).getTime()
    setTime(+sdf)
    setEndTime(+new Date(eventData?.endTime).getTime())
    // console.log("YES",sdf)
   
},[eventData?.startTime,eventData?.endTime])

//console.log(new Date(eventData.endTime).getTime()-new Date().getTime()>0)

//console.log("eventData",eventData,(eventData.startTime.split("T")[0]))


// When the user clicks anywhere outside of the modal, close it
var modalRef = useRef();

useEffect(()=>{
  let handler=(event)=>{
    if(!modalRef?.current?.contains(event.target)){
      setopenModal(true)
    }
  }
  document.addEventListener("mousedown",handler)
  return()=>{
    document.removeEventListener("mousedown",handler)
  }
})



  return (
    <div  style={{display:`${new Date(EndTime).getTime()-new Date().getTime()>0
      &&new Date(EndTime).getTime()-new Date(startTime).getTime()>0?"":"none"}`,

              }}>
        {
            openModal?<div className='event a-glow' onClick={()=>{setopenModal(false);
            }}>
                <button  >Click to Register for Event</button>
                </div>:<div className='meetingTime'ref={modalRef} >

              
                   
    <div  className="expired-notice" >
    <button className='close' onClick={()=>setopenModal(true)}>Close</button>
    <div className='eventYoutube button-85' style={{marginBottom:"3%"}}>
                    <YoutubeEmbed  embedId={eventData?.youtubeUrl?.split("").splice(eventData?.youtubeUrl.lastIndexOf("/")+1).join("")}/>
    </div>
    <b >{eventData?.eventHeading}</b>
    <p className='textmsg' style={{textAlign:"justify",fontSize:"small",
  fontStyle:"normal"}}>{eventData?.eventMessage}</p>

    <h3 className='glow-btn impbtn' style={{marginTop:"3%",cursor:"pointer",color:"#90EE90"}} 
              onClick={()=> window.open(`${eventData.formUrl}`, "_blank")}>
               <span></span>
               <span></span>
               <span></span>
               <span></span>
                Register for Event
              </h3>

      
       {<> 
       <p className='textmsg impmsg'>Meeting start date : {(eventData.startTime).split("T")[0].split("-")[2]+"/"
       +(eventData.startTime).split("T")[0].split("-")[1]+"/"+(eventData.startTime).split("T")[0].split("-")[0]}</p>
            
            
            <p className='textmsg impmsg'>
              Start Time : {new Date(eventData.startTime).toLocaleTimeString()}</p>
           <div >
                <h2>𝐂𝐨𝐮𝐧𝐝𝐨𝐰𝐧:</h2>
                
                  <CountdownTimer type={"startingTime"}  targetDate={startTime}  />
                  
              </div>

              
           
              <div className='timershow' style={{display:"none"}} >
                <h2>Event Ending in :</h2>
              <CountdownTimer   type={"endingTime"}   targetDate={EndTime} />
              </div>
           </>
        }
          </div>
    
              
             

               
                  
                

           
            </div>

        }
       </div>
  );
}

