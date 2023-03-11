

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

const [eventstartDate,setStartDate ]=useState('')

useEffect(()=>{
    
    const myDate=eventData.startTime

    const sdf= new Date(myDate).getTime()
    setTime(+sdf)
    setEndTime(+new Date(eventData.endTime).getTime())
    //console.log("YES",sdf)

},[eventData?.startTime,eventData?.endTime])

//console.log(new Date(eventData.endTime).getTime()-new Date().getTime()>0)

console.log("eventData",eventData)



  return (
    <div  style={{display:`${new Date(EndTime).getTime()-new Date().getTime()>0?"":"none"}`,
              }}>
        {
            openModal?<div className='event a-glow'>
                <button  onClick={()=>setopenModal(false)}>Click to Register for Event</button>
                </div>:<div className='meetingTime'>
                    <button className='ShowImagebtn button-85' onClick={()=>setopenModal(true)}>Close</button>
              <h1>Upcoming Event </h1>
             
             
             
              <h2 className='button-85' style={{backgroundColor:"red"}} 
              onClick={()=> window.open(`${eventData.formUrl}`, "_blank")}>
                <a href={eventData.formUrl} target="_blank" 
              >
                Register for Event
              </a></h2>


    <div className='timershow'>
      <h2>Event Details...!!</h2>
    <div className="expired-notice">
       {<> <span >Meeting in Progress!!!</span>
           <p>Please Register for event fastly...</p></>
        }
          </div>
    </div>








              
              <div className='timershow'>
                <h2>Event starting in :</h2>

                    <CountdownTimer targetDate={startTime} type={"startingTime"} />
              </div>

              <div className='timershow' >
                <h2>Event Ending in :</h2>
              <CountdownTimer  targetDate={EndTime} type={"endingTime"} />
              </div>
               
                  
                <div className='eventYoutube'>
                    <YoutubeEmbed  embedId={eventData?.youtubeUrl?.split("").splice(eventData?.youtubeUrl.lastIndexOf("/")+1).join("")}/>
                </div>

           
            </div>

        }
       </div>
  );
}

