import React, { useState } from 'react'
import "./Styles/TestimonialSection.css"
import { OutlinedInput,Box ,Button} from '@mui/material';
import YoutubeEmbed from '../../LandingPage/YoutubePlayer/YoutubeEmbed';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { Delete } from '@mui/icons-material';

const TestimonialSection = (
    {adminInfo,setAdminInfo,edit,submitFile,saveAdminInfo}
) => {


const [name,setName]=useState("")
const [YoutubeUrl,setYoutubeUrl]=useState("")
const [Text,setText]=useState("")


function SUBMIT_TESTIMONIAL(){
if(name&&YoutubeUrl){
 const payload={
    link: YoutubeUrl,
    name: name,
    text: Text
  }

setAdminInfo({...adminInfo,testimonials:[...adminInfo?.testimonials,payload]})

setName("")
setText("")
setYoutubeUrl("")


Swal.fire({
    position: 'middle',
    icon: 'success',
    title: 'Testimonial Submitted successfully',
    showConfirmButton: false,
    timer: 3000,
    footer:"<h3>Click Save for final save</h3>"
  })

}
else{
    Swal.fire({
        position: 'middle',
        icon: 'error',
        title: 'Oops...',
        text: 'Must Fill URL and NAME in Testimonial form!',
      
      })
    
}
}



function Delete(el,index){
    var newTestimonials=adminInfo?.testimonials.filter((item,i)=>{
        return(i!==index) 
     })
     
     setAdminInfo({...adminInfo,testimonials:newTestimonials})

     Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'DELETED successfully, Please Click Save Button for final save',
        showConfirmButton: false,
        timer: 2000,
      })
     
}



  return (
    <div>
        
        <Box>
            <h3>Testimonial from</h3>
           <Box >
           <label htmlFor="">Name : &nbsp;</label>
           <OutlinedInput value={name} disabled={!edit} type="text" onChange={(e)=>setName(e.target.value)} placeholder='Add name here...' required/>
            </Box>
 
         <Box>
         <label htmlFor="">Youtube Url : </label>
           <OutlinedInput value={YoutubeUrl} disabled={!edit} type="url" onChange={(e)=>setYoutubeUrl(e.target.value)} placeholder='Add Youtube URL here...' required/>
         </Box>

          <Box>
          <label htmlFor="">text feedback : </label>
           <textarea value={Text} disabled={!edit} type="text" onChange={(e)=>setText(e.target.value)} placeholder='Add some feedback text here...(optional)' required/>
          </Box>
          
            
            <Button disabled={!edit} variant="contained" onClick={SUBMIT_TESTIMONIAL}>Submit New Testimonial</Button>

         
        <Box className='GridTestimonial'>
            {
                adminInfo?.testimonials?.map((el,index)=>{
                    return (<Box key={index.toString()+el.link} className='testimonialCard'>
                     { edit &&
                     <Button variant="contained"  sx={{width:"100%",backgroundColor:"red",
                    marginBottom:"1%"}} startIcon={<DeleteIcon />} onClick={()=>Delete(el,index)}>DELETE</Button>
                     }
                     <Box >
                     <YoutubeEmbed  embedId={el.link.split("").splice(el.link.lastIndexOf("/")+1).join("")}/>
                     <b>{el.name}</b>
                     <p>{el.text}</p>

                     </Box>
                    </Box>)
                })
            }

        </Box>

        </Box>

    </div>
  )
}

export default TestimonialSection