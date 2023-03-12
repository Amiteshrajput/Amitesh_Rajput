

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
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
        console.log(doc.data())
      });
        // console.log("eventData",eventData)
    // setLoading(false)
    });
    
  
  }


React.useEffect(()=>{fetchAdminInfo()},[])
// const [display,setDisplay]=useState("none")

useEffect(()=>{
    
    const myDate=eventData.startTime

    const sdf= new Date(myDate).getTime()
    setTime(+sdf)
    setEndTime(+new Date(eventData.endTime).getTime())
    console.log("YES",sdf)
   
},[eventData?.startTime,eventData?.endTime])

//console.log(new Date(eventData.endTime).getTime()-new Date().getTime()>0)

//console.log("eventData",eventData,(eventData.startTime.split("T")[0]))



  return (
    <div  style={{display:`${new Date(EndTime).getTime()-new Date().getTime()>0
      &&new Date(EndTime).getTime()-new Date(startTime).getTime()>0?"":"none"}`
              }}>
        {
            openModal?<div className='event a-glow'>
                <button  onClick={()=>setopenModal(false)}>Click to Register for Event</button>
                </div>:<div className='meetingTime'>
                    <button className='ShowImagebtn button-85' onClick={()=>setopenModal(true)}>Close</button>
              <h1 style={{marginTop:"10%"}}>Upcoming Event </h1>
             
             
             
              <h2 className='button-85' style={{backgroundColor:"red"}} 
              onClick={()=> window.open(`${eventData.formUrl}`, "_blank")}>
                <a href={eventData.formUrl} target="_blank" 
              >
                Register for Event
              </a></h2>


    <div className='timershow evendetails'>
      <h2 style={{color:"green"}}>👀See Event Details here ...!!</h2>
    <div  className="expired-notice" style={{backgroundColor:"white"}}>
      
       {<> 
       <span >Meeting start date : {(eventData.startTime).split("T")[0].split("-")[2]+"/"
       +(eventData.startTime).split("T")[0].split("-")[1]+"/"+(eventData.startTime).split("T")[0].split("-")[0]}</span>
            
             <p></p>
            <span>Start Time : {new Date(eventData.startTime).toLocaleTimeString()}</span>
            <p><a href={eventData.formUrl} className='atag' style={{
              textDecorationLine:"underline"
            }} target="_blank">Register Now</a></p>
           <p style={{color:"blue"}}>Please Register for event fastly...</p>


           <div >
                <h2>𝐂𝐨𝐮𝐧𝐝𝐨𝐰𝐧 𝐓𝐢𝐦𝐞𝐫 :</h2>
                
                  <CountdownTimer type={"startingTime"}  targetDate={startTime}  />
                  
              </div>

              <div className='eventYoutube'>
                    <YoutubeEmbed  embedId={eventData?.youtubeUrl?.split("").splice(eventData?.youtubeUrl.lastIndexOf("/")+1).join("")}/>
                </div>
           
           </>
        }
          </div>
    </div>
              
             

              <div className='timershow' style={{display:"none"}} >
                <h2>Event Ending in :</h2>
              <CountdownTimer   type={"endingTime"}   targetDate={EndTime} />
              </div>
               
                  
                

           
            </div>

        }
       </div>
  );
}
