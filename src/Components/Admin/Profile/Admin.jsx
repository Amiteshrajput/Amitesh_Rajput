import React,{useEffect, useState,useContext} from 'react'
import { Button, Grid, TextField, Tooltip, } from '@mui/material'
import {  setDoc, doc,collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig/firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable,deleteObject } from "firebase/storage";
import { storage } from '../../../firebaseConfig/firebaseConfig';
import "./Admin.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { UserContext } from '../../../Contexts/UserContext';
import { FloatingButton } from './FloatingButton';
import { theme } from './theme';
import { Markup } from 'interweave';
import Swal from 'sweetalert2'
import TestimonialSection from './TestimonialSection';

// import PlanSection from './PlanSection';

function AdminProfile() {

  const [edit,setEdit]=useState(false)
  const [editPhoto,setEditPhoto]=useState(false)
  const [editHeaderImage,setEditHeaderImage]=useState(false)
  const [editAboutMeImage,setEditAboutMeImage]=useState(false)
  const [editVideo,setEditVideo]=useState(false)
  

  const [state,dispatch]=useContext(UserContext)

  const [adminInfo,setAdminInfo]=React.useState()



  //fetch function
  const fetchAdminInfo=async()=>{

    const q = query(collection(db, "usersData"),where('email','==',''));
    onSnapshot(q, (querySnapshot) => {
       let adminData ={}
      querySnapshot.forEach((doc) => {
        adminData={...doc.data()}
        console.log(doc.data())
      });

      // console.log(adminData)
    setAdminInfo(adminData)
    // setLoading(false)
    });
    // const docRef = doc(db, "usersData", '0SRf2rIzwoCdh1P0mrco');
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    //   setAdminInfo(docSnap.data())
    //   // setLoading(false)
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  
  }
  
  //save in firestore
  const saveAdminInfo=async(e)=>{
    e && e.preventDefault();
    try {
      // let tempor=JSON.parse(JSON.stringify({...adminInfo}))
      await setDoc(doc(db, "usersData", '0SRf2rIzwoCdh1P0mrco'),{...adminInfo})
        console.log("Admin details saved successfully!")
      }
       catch (e) {
      console.log("Error adding document: ", e);
    }
  }

 // const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [photogalleryFile,setPhotoGalleryFile] = useState()
  const [plangalleryFile,setplanGalleryFile] = useState()
  
  const [headerImage,setHeaderImage] = useState(adminInfo?adminInfo.headerImage?.src:'')
  const [aboutMeImage,setAboutMeImage] = useState(adminInfo?adminInfo.aboutMeImage?.src:'')
  const [introVideo,setIntroVideo] = useState(adminInfo?adminInfo.introVideo?adminInfo.introVideo:'':'')
  
  //submit files to firebase storage  
  const submitFile=(e,type,id)=>{
    e && e.preventDefault()
    let file = e?.target.files[0] || e?.target[0]?.files[0]
    console.log(e,file)
    if (!file) return;
    const storageRef = ref(storage,`${type}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      async() => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         
        // setImgUrl(downloadURL)
          setProgresspercent(0)
          let temp=adminInfo?adminInfo.photoGallery?adminInfo.photoGallery:[{src:downloadURL,fileRef:`${type}/${file.name}`,id:0}]:[]

          let tempPlan=adminInfo?adminInfo.planGallery?adminInfo.planGallery:[{src:downloadURL,fileRef:`${type}/${file.name}`,id:0}]:[]

          if(type==='photoGallery' && adminInfo.photoGallery){
            if(id===adminInfo.photoGallery.length){//Add file to end of temp
              temp=[...adminInfo.photoGallery,{src:downloadURL,fileRef:`${type}/${file.name}`,id:id}]
            }
            else if(id<adminInfo.photoGallery.length){//Relpace file at index id with current file
              temp[id]={src:downloadURL,fileRef:`${type}/${file.name}`,id:id}
            }
          }
          else if(type==="planGallery" && adminInfo.planGallery){
            if(id===adminInfo.planGallery.length){//Add file to end of temp
              tempPlan=[...adminInfo.planGallery,{src:downloadURL,fileRef:`${type}/${file.name}`,id:id}]
            }
            else if(id<adminInfo.planGallery.length){//Relpace file at index id with current file
              tempPlan[id]={src:downloadURL,fileRef:`${type}/${file.name}`,id:id}
            }
          }
          setAdminInfo({
            ...adminInfo,
            [type==='aboutMeImage'?'aboutMeImage':type==='headerImage'?'headerImage':type==="planGallery"?"planGallery":'photoGallery'] : 
            type==='aboutMeImage' || type==='headerImage'?
             {src:downloadURL,fileRef:`${type}/${file.name}`}:type==="planGallery"?tempPlan:temp
          })
          console.log('Inside submit File',adminInfo);
          // alert('Save to make final changes')
          // return temp,downloadURL
          // saveAdminInfo()
        })
        // .then(saveAdminInfo)
      }
    );
  return 'submitted'
  }
  
  //delete Image from firebase storage
  const deleteImage=async(fileRef,id,type)=>{
    let ans=window.confirm('Sure want to delete?')
    if(ans){
      // Delete the file
      const fileFullRef = ref(storage, fileRef);
      deleteObject(fileFullRef).then((e) => {
      // File deleted successfully photoGallery
      
      let temp=type==="photoGallery"?
      adminInfo.photoGallery.filter((item)=>{return item.id!==id}):
      adminInfo.planGallery.filter((item)=>{return item.id!==id})

      for(let i=id;i<temp.length;i++){
        temp[i].id--;
      }
      alert('Save to make final changes')
      console.log('Inside delete Image');
      return temp
      })
      .then((temp)=>{

        type==="photoGallery"?setAdminInfo({...adminInfo,photoGallery : temp}):
        setAdminInfo({...adminInfo,planGallery : temp})


        // saveAdminInfo()
      })
      // .then(saveAdminInfo)  
      .catch((error) => {
      // Uh-oh, an error occurred!
      alert('Save to make final changes')
      });
    }
  }
  
  //edit image by first deleting it from firebase storage and then uploading new file
  const editDeleteImage=async(fileRef,set,id)=>{
    let ans=window.confirm('Sure want to change photo?')
    if(ans){
      const fileFullRef = ref(storage, fileRef);
      
      deleteObject(fileFullRef).then(async(e) => {
        // File deleted successfully
        set(id>=0?id:true)
        // console.log('Inside editDeleteImage')
        alert('Save to make final changes')
        // saveAdminInfo(e)
        }).catch((error) => {
        // Uh-oh, an error occurred!
        set(id>=0?id:true)
        alert('File already deleted')
        });
      // Delete the file
      
    }
    else{
      set(false)
    }
  }


  useEffect(()=>{
    fetchAdminInfo();
  },[])


 const [mainhead,setmainhead]=useState('')
 const [innertext,setInnertext]=useState('')
 const [plhead,setPhead]=useState('');
 const [pltext,setPltext]=useState('');
 const [show,setShow]=useState(false)
 const [addHeading,setAddHeading]=useState(false)
 const [addText,setAddText]=useState(false)
 let tem=<div>ejhfjhej</div>
 const [plansImage, setPlansImage] = useState("")

 console.log("Admininfo from plan",adminInfo)

function submitPLhead(){
setInnertext(prev=>prev+`<h1>${plhead}</h1>`)
setPhead('')
}

function submitPLtext(){
setInnertext(prev=>prev+`<p>${pltext}</p>`)
setPltext('')
}

// function to submit img in plan section 
function SubmitPlanImg(src){
  
if(src){
setInnertext(prev=>prev+`<img src=${src}  alt="imb"/>`)
console.log("innertext",innertext)
setPlansImage("");
}else{
  alert("Please put the image address in input text  ")
}

}


function SubmitPlanHeading(){
const planhead={
 "mainHead":mainhead,
 "innertext":innertext
} 
setmainhead('')
setInnertext('')
setAdminInfo({...adminInfo,plans:adminInfo.plans?[...adminInfo.plans,planhead]:[planhead]})
  console.log(adminInfo)
 }

function DELETEHEADING(item){
var newPlans=adminInfo?.plans.filter((el)=>{
 return(el.mainHead!==item.mainHead && el.innertext!==item.innertext) 
})

setAdminInfo({...adminInfo,plans:newPlans})
}

  return (
    <div className='Admin'>
      {adminInfo?
    <Grid container spacing={2} sx={{color:'blue',backgroundColor:'white'}}>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={adminInfo.name} 
        onChange={e=>setAdminInfo({...adminInfo,name:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{}}>
        <TextField id="outlined-basic" label="Profession"
       
         InputLabelProps={{
           shrink: true,
         }} variant="outlined" value={adminInfo.profession} onChange={e=>setAdminInfo({...adminInfo,profession:e.target.value})} disabled={!edit} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField  InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Education & Experience" variant="outlined" value={adminInfo.educationAndExperience} onChange={e=>setAdminInfo({...adminInfo,educationAndExperience:e.target.value})} disabled={!edit} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,    
         }} id="outlined-basic" label="Commitment1" variant="outlined" value={adminInfo.commitment1} onChange={e=>setAdminInfo({...adminInfo,commitment1:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Commitment2" variant="outlined" value={adminInfo.commitment2} onChange={e=>setAdminInfo({...adminInfo,commitment2:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Commitment3" variant="outlined" value={adminInfo.commitment3} onChange={e=>setAdminInfo({...adminInfo,commitment3:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Commitment4" variant="outlined" value={adminInfo.commitment4} onChange={e=>setAdminInfo({...adminInfo,commitment4:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6}  sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-multiline-flexible"
        label="About"
        multiline
        maxRows={4} variant='outlined' required fullWidth value={adminInfo.about} onChange={e=>setAdminInfo({...adminInfo,about:e.target.value})} disabled={!edit}/>
      </Grid>
      
      <Grid item xs={12} sm={6} sx={{color:'black'}}>
        {adminInfo.introVideo?(editVideo?
           <div>
            <TextField type='url' value={adminInfo?.introVideo?introVideo:adminInfo.introVideo} onChange={(e)=>setIntroVideo(e.target.value)} 
            placeholder='Enter url here' disabled={!edit}/>
            <Button onClick={()=>{setAdminInfo({...adminInfo,introVideo:introVideo});}}>Make changes</Button>
           </div>:
           <div>
            {/* Put Video code here */
            
            <div className="video-responsive">
            <iframe
             width="853"
             height="480"
               src={`https://www.youtube.com/embed/${adminInfo?.introVideo.split("").splice(adminInfo?.introVideo.lastIndexOf("/")+1).join("")}`}
              
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
            
            }
            <Button variant="contained"color="error" onClick={()=>setEditVideo(true)} disabled={!edit}>Change 
            YouTube Video</Button>
           </div>)
        :<div>
          <TextField type='url' value={introVideo} onChange={(e)=>setIntroVideo(e.target.value)} placeholder='Enter url here' disabled={!edit}/>
          <Button variant="contained" onClick={()=>{setAdminInfo({...adminInfo,introVideo:introVideo});}}>Save changes</Button>
        </div>}
      </Grid>

      <Grid item xs={12} sm={6}>
      {adminInfo.aboutMeImage?
        <div className='card'>
          
                <p style={{fontSize:"25px",position:"absolute",zIndex:"500",left:"30%",top:"10%",color:"red",
                fontWeight:"800"}}>ABOUT ME IMAGE(2nd img)</p>
                <img  className='card'  width="100%" height='100%'  src={adminInfo.aboutMeImage.src}/>
              
              <div style={{display:"flex",justifyContent:"space-between",position:"absolute",top:"1%",left:"1%"}}>
                <Tooltip  title="Edit This Img" followCursor>
                  {editAboutMeImage?
                  <div style={{width:"80%",margin:"auto"}}>
                    <input style={{width:"90px",height:"25px",
                    padding:"0",backgroundColor:"red",
                    marginBottom:"2%",
                    borderRadius:"0"}} 
                    type="file"  accept='.gif, .jpg, .png' onChange={e=>setAboutMeImage(e)}/>
                    <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
                    onClick={()=>{setEditAboutMeImage(false);
                        submitFile(aboutMeImage,'aboutMeImage')}}>Upload</Button>
                      <Button variant="contained" size="small"
                      sx={{backgroundColor:"green"}} onClick={()=>{setEditAboutMeImage(false)}}>Cancel</Button>  
                 
                  </div>:
                  <Button size="small"   variant="contained"
                   onClick={()=>{
                  editDeleteImage(adminInfo.aboutMeImage.fileRef,setEditAboutMeImage)}} disabled={!edit}>Edit</Button>}    
                </Tooltip>
              </div>
             
        </div>:
        <div style={{width:"80%",margin:"auto"}}>
            <input style={{width:"90px",height:"25px",
             padding:"0",backgroundColor:"red",
             marginBottom:"2%",
             borderRadius:"0"}} 
             type="file"  accept='.gif, .jpg, .png' onChange={e=>setAboutMeImage(e)}/>
            <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
             onClick={()=>{setEditAboutMeImage(false);setEdit(true);
             submitFile(aboutMeImage,'aboutMeImage')}}>Upload</Button>
        </div>}
      </Grid>

      <Grid item xs={12} sm={6}>
      {adminInfo.headerImage?
        <div className='card'>
           <p style={{fontSize:"25px",position:"absolute",zIndex:"500",left:"30%",top:"10%",color:"red",
           fontWeight:"800"}}>INTRO IMAGE(1st Img)</p>
              <img  className='card'  width="100%" height='100%'  src={adminInfo.headerImage.src}/>
              <div style={{display:"flex",justifyContent:"space-between",position:"absolute",top:"1%",left:"1%"}}>
                <Tooltip  title="Edit This Img" followCursor>
                  {editHeaderImage?
                  <div style={{width:"80%",margin:"auto"}}>
                    <input style={{width:"90px",height:"25px",
                    padding:"0",backgroundColor:"red",
                    marginBottom:"2%",
                    borderRadius:"0"}} 
                    type="file"  accept='.gif, .jpg, .png' onChange={e=>setHeaderImage(e)}/>
                    <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
                    onClick={()=>{setEditHeaderImage(false);
                        submitFile(headerImage,'headerImage')}}>Upload</Button>
                      {/* <Button variant="contained" size="small"
                      sx={{backgroundColor:"green"}} onClick={()=>{setEditHeaderImage(false)}}>Cancel</Button>   */}
                  </div>:
                  <Button size="small"   variant="contained"
                   onClick={()=>{
                  editDeleteImage(adminInfo.headerImage.fileRef,setEditHeaderImage)}} disabled={!edit}>Edit</Button>}    
                </Tooltip>
              </div>
        </div>:
        <div style={{width:"80%",margin:"auto"}}>
            <input style={{width:"90px",height:"25px",
             padding:"0",backgroundColor:"red",
             marginBottom:"2%",
             borderRadius:"0"}} 
             type="file"  accept='.gif, .jpg, .png' onChange={e=>setHeaderImage(e)}/>
            <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
             onClick={()=>{setEditHeaderImage(false);setEdit(true);
             submitFile(headerImage,'headerImage')}}>Upload</Button>
        </div>}
      </Grid>

        <Grid item xs={12} sm={12}>
        {edit?
        <Grid item xs={12} sm={12}>
          <Button variant="contained" type='submit' xs={6} sm={6} onClick={e=>{saveAdminInfo(e);
          setEdit(false);setEditPhoto(false)}}>Save</Button>
          <Button variant="contained" xs={6} sm={6} onClick={()=>{setEdit(false);setEditPhoto(false)}}>Cancel</Button>
        </Grid>:
        <Button variant="contained" onClick={()=>setEdit(true)}>Edit</Button>}
        </Grid>

        <div className='mainbox' style={{backgroundColor:"pink"}}>
          <h1 >Photo Gallery</h1>

          {edit?<div style={{display:"flex",width:"80%",margin:"auto"}}>
            <input type="file"  accept='.gif, .jpg, .png' onChange={e=>setPhotoGalleryFile(e)}/>
            <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
            onClick={()=>submitFile(photogalleryFile,'photoGallery',
            adminInfo.photoGallery?adminInfo.photoGallery.length:0)}>Upload Photo </Button>
          </div>:''}

          <div className='photosCards'>
            {!adminInfo.photoGallery?<h4>'Loading...'</h4>:adminInfo.photoGallery.map((item)=>{
              // console.log(item.src)
              return <div className='card' key={item.src} >
              <img  className='card'  width="100%" height='100%'  src={item.src}/>
              {edit?
              <div style={{display:"flex",justifyContent:"space-between",position:"absolute",top:"1%",left:"1%"}}>
                <Tooltip  title="Edit This Img" followCursor>
                  {editPhoto===item.id?
                  <div style={{width:"80%",margin:"auto"}}>
                    <input style={{width:"90px",height:"25px",
                    padding:"0",backgroundColor:"red",
                    marginBottom:"2%",
                    borderRadius:"0"}} 
                    type="file"  accept='.gif, .jpg, .png' 
                    onChange={e=>setPhotoGalleryFile(e)}/>
                    <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
                    onClick={()=>{setEditPhoto(false);
                      submitFile(photogalleryFile,'photoGallery',item.id)}}>Upload</Button>
                      <Button variant="contained" size="small"
                      sx={{backgroundColor:"green"}} onClick={()=>{setEditPhoto(false)}}>Cancel</Button>  
                  </div>:
                  <Button size="small"   variant="contained"
                   onClick={()=>{
                    // setEditPhoto(item.id)
                  editDeleteImage(item.fileRef,setEditPhoto,item.id)}}>Edit</Button>}    
                </Tooltip>
                <Tooltip title="Delete This Img" followCursor>
                  <Button size="small" sx={{marginLeft:"5%"}} variant="contained"
                   color="error" startIcon={<DeleteIcon />} onClick={()=>{deleteImage(item.fileRef,item.id,"photoGallery")}}>Delete</Button>
                </Tooltip>
              </div>:''}
          </div>
          })
          }
          </div>
        </div>

{/* //plans section start from here  */}
        {/* <PlanSection 
        adminInfo={adminInfo} 
        setAdminInfo={setAdminInfo} 
        edit={edit} 
        submitFile={submitFile} 
        saveAdminInfo={saveAdminInfo}/> */}


<div className='adminPlanSection' style={{backgroundColor:"#FFFFF7",padding:"1%"}}>
{/* //plans section start from here  */}
<h1 >Plans section</h1>
<Grid container spacing={2} sx={{color:'blue',padding:"2%"}}>
    <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
      <TextField id="outlined-basic" label="1st Paragraph" variant="outlined" value={adminInfo.plantext1
      } 
      onChange={e=>setAdminInfo({...adminInfo,plantext1:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
    </Grid>
    <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
      <TextField id="outlined-basic" label="2st Paragraph" variant="outlined" value={adminInfo.plantext2} 
      onChange={e=>setAdminInfo({...adminInfo,plantext2:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
    </Grid>
    <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
      <TextField id="outlined-basic" label="3rd paragraph(NOTE)" variant="outlined" value={adminInfo.plannote} 
      onChange={e=>setAdminInfo({...adminInfo,plannote:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
    </Grid>
    <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
      <TextField id="outlined-basic" label="1st Heading" variant="outlined" value={adminInfo.planheading1} 
      onChange={e=>setAdminInfo({...adminInfo,planheading1:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
    </Grid>
    <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
      <TextField id="outlined-basic" label="4th paragraph" variant="outlined" value={adminInfo.plantext3} 
      onChange={e=>setAdminInfo({...adminInfo,plantext3:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
    </Grid>

    <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
      <TextField id="outlined-basic" label="5th paragraph" 
      variant="outlined" value={adminInfo.plantext4} 
      onChange={e=>setAdminInfo({...adminInfo,plantext4:e.target.value})} 
      disabled={!edit} sx={{color:'blue'}} required/>
    </Grid>


    <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
      <TextField id="outlined-basic" label="2nd Heading" variant="outlined" value={adminInfo.planheading2} 
      onChange={e=>setAdminInfo({...adminInfo,planheading2:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
    </Grid>

    <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
      <TextField id="outlined-basic" label="6th paragraph" variant="outlined"
       value={adminInfo.plantext5} 
      onChange={e=>setAdminInfo({...adminInfo,plantext5:e.target.value})} disabled={!edit} 
      sx={{color:'blue'}} required/>
    </Grid>

</Grid>

{/* code for PLAN GALLARY starting here */}

<div className='mainbox' style={{backgroundColor:"#90EE90"}}>
          <h1 >PLAN GALLERY</h1>

          {edit?<div style={{display:"flex",width:"80%",margin:"auto"}}>
            <input type="file"  accept='.gif, .jpg, .png' onChange={e=>setplanGalleryFile(e)}/>
            <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
            onClick={()=>submitFile(plangalleryFile,'planGallery',
            adminInfo.planGallery?adminInfo.planGallery.length:0)}>Upload Photo </Button>
          </div>:''}

          <div className='photosCards'>
            {!adminInfo.planGallery?<h4>'Loading...'</h4>:adminInfo.planGallery.map((item)=>{
              // console.log(item.src)
              return <div className='card' key={item.src} >
              <img  className='card'  width="100%" height='100%'  src={item.src}/>
              {edit?
              <div style={{display:"flex",justifyContent:"space-between",position:"absolute",top:"1%",left:"1%"}}>
                <Tooltip  title="Edit This Img" followCursor>
                  {editPhoto===item.id?
                  <div style={{width:"80%",margin:"auto"}}>
                    <input style={{width:"90px",height:"25px",
                    padding:"0",backgroundColor:"red",
                    marginBottom:"2%",
                    borderRadius:"0"}} 
                    type="file"  accept='.gif, .jpg, .png' 
                    onChange={e=>setplanGalleryFile(e)}/>
                    <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
                    onClick={()=>{setEditPhoto(false);
                      submitFile(plangalleryFile,'planGallery',item.id)}}>Upload</Button>
                      <Button variant="contained" size="small"
                      sx={{backgroundColor:"green"}} onClick={()=>{setEditPhoto(false)}}>Cancel</Button>  
                  </div>:
                  <Button size="small"   variant="contained"
                   onClick={()=>{
                    // setEditPhoto(item.id)
                  editDeleteImage(item.fileRef,setEditPhoto,item.id)}}>Edit</Button>}    
                </Tooltip>
                <Tooltip title="Delete This Img" followCursor>
                  <Button size="small" sx={{marginLeft:"5%"}} variant="contained"
                   color="error" startIcon={<DeleteIcon />} onClick={()=>{deleteImage(item.fileRef,item.id,"planGallery")}}>Delete</Button>
                </Tooltip>
              </div>:''}
          </div>
          })
          }
          </div>
        </div>

{/* code for PLAN GALLARY ENDING here */}


{/*plan section starts here*/}

<h2 >Create headings in plan page</h2>

<div className='planPageHead'>

<div className='PageHead'>
<textarea id="outlined-basic" type="text" 
value={mainhead}
onChange={(e)=>setmainhead(e.target.value)}
 placeholder='Add Main Heading here' disabled={!edit}/>
<div style={{border:"2px solid red"}}>
 {!addHeading?<Button variant="contained"
 color="secondary"
 onClick={()=>setAddHeading(!addHeading)}  disabled={!edit}>
  ADD HEADING
 </Button>
 :<>
 <textarea id="outlined-basic" type="text" 
 value={plhead}
  placeholder='addHeading' 
  onChange={(e)=>setPhead(e.target.value)}  disabled={!edit}/>
 <Button  variant="contained"
 color='success'onClick={submitPLhead}  disabled={!edit}>Submit Heading</Button>
 </>}
 {/* //to upload photo in plans */}
 {
  <div style={{width:"80%",margin:"auto"}}>
  <input style={{width:"400px",height:"25px",
   padding:"2%",color:"black",fontSize:"large",
   marginBottom:"2%",
   borderRadius:"0"}}
   placeholder="Submit image address" 
   type="url" 
   value={plansImage}
   onChange={(e)=>setPlansImage(e.target.value)}  disabled={!edit}/>
  <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
   onClick={
    ()=>{SubmitPlanImg(plansImage)}

  }  disabled={!edit}>Upload</Button>
  </div>
 }
  {!addText?<Button variant="contained"
   onClick={()=>setAddText(!addText)} disabled={!edit}>
    ADD TEXT
  </Button>:
 <>
  <textarea id="outlined-basic" value={pltext}
  onChange={(e)=>setPltext(e.target.value)}
  type="text" placeholder='add simple text'  disabled={!edit}/>
  <Button  variant="contained"
 color='success' onClick={submitPLtext}  disabled={!edit}>Submit Text</Button>
 </>
 }

<Button  variant="contained"
 color='success'
 onClick={SubmitPlanHeading}  disabled={!edit}>Submit Whole Heading</Button>

</div>

<h1 style={{backgroundColor:"red"}}>
  {mainhead}
</h1>
<div>
<Markup content={innertext} />
</div>


</div>
<div className='ShowHeading'>

{
  adminInfo?.plans?.map((item,index)=>{
    return (
    <div key={item.mainHead}>
      <Button variant="contained" color='error' 
      onClick={()=>DELETEHEADING(item)}  disabled={!edit}>DELETE {index+1} Heading</Button>
      <h3 style={{backgroundColor:"yellow",marginTop:"2%",textAlign:"center"}} 
      onClick={()=>{if(show===false)setShow(index)
      else setShow(false);{console.log("show",show)}}}>
        {item.mainHead}</h3>
       { show===index &&
        <Markup content={item.innertext}/>

       }

    </div>)
  })
}

<Button variant="contained" color='success'
 onClick={(e)=>{setAdminInfo({...adminInfo,plans:[...adminInfo.plans]});
 saveAdminInfo(e);
 setEdit(false)
 alert("PLAN Submitted successfully")}}  disabled={!edit}>
  Final Plans Submit</Button>
</div>

</div>

{/* //plans section end here  */}
</div>

{/* testimonials section start from here  */}

<div className='testimonial-section' >
<h1 >Testimonial section</h1>
<TestimonialSection  edit={edit}   
      adminInfo={adminInfo}
      setAdminInfo={setAdminInfo}
      submitFile={submitFile}
      saveAdminInfo={saveAdminInfo}            />

</div>







{/* testimonials section end here  */}





















        <Grid item xs={12} sm={12}>
        {edit?
        <div  style={{display:"flex",border:"1px solid green"}} >
          <FloatingButton  color={theme.color.white}
       background={"blue"} type='submit' rightOffset = "230px" onClick={e=>{saveAdminInfo(e);
          setEdit(false);
          Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Your data has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          // setEditPhoto(false)
          }}>Save</FloatingButton>
          <FloatingButton  color={theme.color.white}
       background={"red"}  onClick={()=>{setEdit(false);
      //  setEditPhoto(false)
       }}>Cancel</FloatingButton>
        </div>:
        
       <FloatingButton
       color={theme.color.white}
       background={"red"}
       onClick={()=>setEdit(true)}>
       Edit Whole Profile
     </FloatingButton> 
        }
        </Grid>
    </Grid>:'Loading...'}
    </div>
  )
}
export default AdminProfile