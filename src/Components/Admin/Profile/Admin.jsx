import React,{useEffect, useState,useContext} from 'react'
import { Button, Fab, Grid, TextField, Tooltip, } from '@mui/material'
import { getDoc, setDoc, doc,collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig/firebaseConfig';
import {useNavigate} from 'react-router-dom'
import { ref, getDownloadURL, uploadBytesResumable,deleteObject } from "firebase/storage";
import { storage } from '../../../firebaseConfig/firebaseConfig';
import "./Admin.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { UserContext } from '../../../Contexts/UserContext';
import NavigationIcon from '@mui/icons-material/Navigation'
import { FloatingButton } from './FloatingButton';
import { theme } from './theme';
import { Markup } from 'interweave';

function AdminProfile() {

  const navigate=useNavigate()
  const [edit,setEdit]=useState(false)
  const [editPhoto,setEditPhoto]=useState(false)
  const [editHeaderImage,setEditHeaderImage]=useState(false)
  const [editAboutMeImage,setEditAboutMeImage]=useState(false)
  const [editVideo,setEditVideo]=useState(false)
  const [addHeading,setAddHeading]=useState(false)
  const [addText,setAddText]=useState(false)
  const [plansImage, setPlansImage] = useState()

  // const admin=JSON.parse(sessionStorage.getItem('admin'))
  const [state,dispatch]=useContext(UserContext)

  const [adminInfo,setAdminInfo]=React.useState()



  //fetch function
  const fetchAdminInfo=async()=>{

    // const q = query(collection(db, "usersData"),where('email','==','dummy'));
    // onSnapshot(q, (querySnapshot) => {
    //   const adminData = [];
    //   querySnapshot.forEach((doc) => {
    //     adminData.push(doc.data());
    //   });

    //   console.log(adminData)
    // setAdminInfo(adminData)
    // });
    const docRef = doc(db, "usersData", state.admin.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setAdminInfo(docSnap.data())
      // setLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  
  }
  
  //save in firestore
  const saveAdminInfo=async(e)=>{
    e && e.preventDefault();
    try {
      let tempor=JSON.parse(JSON.stringify({...adminInfo}))
      await setDoc(doc(db, "usersData", state.admin.uid),tempor)
      .then(async ()=>{await setDoc(doc(db, "usersData", 'it145zGVbxyLdl4DFOQh'),{...adminInfo,email:''})
        // console.log("Admin details saved successfully!")
      })
      
      // navigate('/admin/profile')
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [photogalleryFile,setPhotoGalleryFile] = useState()
  const [headerImage,setHeaderImage] = useState(adminInfo?adminInfo.headerImage?.src:'')
  const [aboutMeImage,setAboutMeImage] = useState(adminInfo?adminInfo.aboutMeImage?.src:'')
  const [introVideo,setIntroVideo] = useState(adminInfo?adminInfo.introVideo?adminInfo.introVideo:'':'')
  
  //submit files to firebase storage
  const submitFile=(e,type,id)=>{
    e && e.preventDefault()
    let file =   e?.target.files[0] || e?.target[0]?.files[0]
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
          setImgUrl(downloadURL)
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
            // else{
            //   temp=[{src:downloadURL,fileRef:`${type}/${file.name}`,id:0}]
            // }
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
          saveAdminInfo()
        })
        // .then(saveAdminInfo)
      }
    );
  }
  
  //delete Image from firebase storage
  const deleteImage=async(fileRef,id)=>{
    let ans=window.confirm('Sure want to delete?')
    if(ans){
      // Delete the file
      const fileFullRef = ref(storage, fileRef);
      deleteObject(fileFullRef).then((e) => {
      // File deleted successfully
      // saveAdminInfo(e)
      let temp=adminInfo.photoGallery.filter((item)=>{return item.id!==id})
      for(let i=id;i<temp.length;i++){
        temp[i].id--;
      }
      alert('Save to make final changes')
      console.log('Inside delete Image');
      return temp
      })
      .then((temp)=>{
        setAdminInfo({...adminInfo,photoGallery : temp})
        saveAdminInfo()
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
        set(id?id:true)
        console.log('Inside editDeleteImage')
        // saveAdminInfo(e)
        }).catch((error) => {
        // Uh-oh, an error occurred!
        alert('File already deleted')
        });
      // Delete the file
      alert('Save to make final changes')
    }
    else{
      set(false)
    }
  }

// console.log("video",adminInfo?.introVideo.split("").splice(adminInfo?.introVideo.lastIndexOf("/")+1).join(""))


  useEffect(()=>{
    fetchAdminInfo();
  },[])

const [mainhead,setmainhead]=useState('')
const [innertext,setInnertext]=useState('')
const [plhead,setPhead]=useState('');
const [pltext,setPltext]=useState('');
const [show,setShow]=useState(false)


function submitPLhead(){
setInnertext(prev=>prev+`<h1>${plhead}</h1>`)
setPhead('')
}

function submitPLtext(){
setInnertext(prev=>prev+`<p>${pltext}</p>`)
setPltext('')
}

//console.log("mainhead=>",mainhead)
//  console.log("innertext=>",innertext)
 function SubmitPlanImg(){
  setInnertext(prev=>prev+`<img src=${adminInfo.planGallery?adminInfo.planGallery[(adminInfo.planGallery.length-1)].src:"null"}  alt="imb"/>`)
 }



function SubmitPlanHeading(){
  const planhead={
    "mainHead":mainhead,
    "innertext":innertext
  } 
  setmainhead('')
  setInnertext('')
  setAdminInfo({...adminInfo,plans:[...adminInfo.plans,planhead]})
     //console.log(plans)
}

function DELETEHEADING(item){
 var newPlans=adminInfo?.plans.filter((el)=>{
    return(el.mainHead!==item.mainHead && el.innertext!==item.innertext) 
 })
 
 setAdminInfo({...adminInfo,plans:newPlans})
}

 //console.log("ADMIN INFO",adminInfo)

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
            <TextField type='url' value={adminInfo?.introVideo?introVideo:adminInfo.introVideo} onChange={(e)=>setIntroVideo(e.target.value)} placeholder='Enter url here' disabled={!edit}/>
            <Button onClick={()=>{setAdminInfo({...adminInfo,introVideo:introVideo});saveAdminInfo();}}>Make changes</Button>
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
            <Button onClick={()=>setEditVideo(true)} disabled={!edit}>Change Video</Button>
           </div>)
        :<div>
          <TextField type='url' value={introVideo} onChange={(e)=>setIntroVideo(e.target.value)} placeholder='Enter url here' disabled={!edit}/>
          <Button onClick={()=>{setAdminInfo({...adminInfo,introVideo:introVideo});saveAdminInfo();}}>Save changes</Button>
        </div>}
      </Grid>

      <Grid item xs={12} sm={6}>
      {adminInfo.aboutMeImage?
        <div className='card'>
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
                      <Button variant="contained" size="small"
                      sx={{backgroundColor:"green"}} onClick={()=>{setEditHeaderImage(false)}}>Cancel</Button>  
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
          <Button type='submit' xs={6} sm={6} onClick={e=>{saveAdminInfo(e);
          setEdit(false);setEditPhoto(false)}}>Save</Button>
          <Button xs={6} sm={6} onClick={()=>{setEdit(false);setEditPhoto(false)}}>Cancel</Button>
        </Grid>:
        <Button onClick={()=>setEdit(true)}>Edit</Button>}
        </Grid>

        <div className='mainbox'>
          <h1 >Photo Gallery</h1>

          {edit?<div style={{display:"flex",width:"80%",margin:"auto"}}>
            <input type="file"  accept='.gif, .jpg, .png' onChange={e=>setPhotoGalleryFile(e)}/>
            <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
            onClick={()=>submitFile(photogalleryFile,'photoGallery',adminInfo.photoGallery?adminInfo.photoGallery.length:0)}>Upload Photo </Button>
          </div>:''}

          <div className='photosCards'>
            {!adminInfo.photoGallery?<h4>'Loading...'</h4>:adminInfo.photoGallery.map((item)=>{
              // console.log(item.src)
              return <div className='card' key={item.src} >
              <img  className='card'  width="100%" height='100%'  src={item.src}/>
              {edit?<div style={{display:"flex",justifyContent:"space-between",position:"absolute",top:"1%",left:"1%"}}>
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
                   onClick={()=>{ setEditPhoto(item.id)
                  editDeleteImage(item.fileRef)}}>Edit</Button>}    
                </Tooltip>
                <Tooltip title="Delete This Img" followCursor>
                  <Button size="small" sx={{marginLeft:"5%"}} variant="contained" color="error" startIcon={<DeleteIcon />} onClick={()=>{deleteImage(item.fileRef,item.id)}}>Delete</Button>
                </Tooltip>
              </div>:''}
          </div>
          })
          }
          </div>
        </div>

{/* //plans section start from here  */}
<div className='PlanSection'>

  <h1 >Plans section</h1>
  <Grid container spacing={2} sx={{color:'blue',padding:"2%"}}>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="We Help" variant="outlined" value={adminInfo.plantext1
        } 
        onChange={e=>setAdminInfo({...adminInfo,plantext1:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="We Don't Need Your Money" variant="outlined" value={adminInfo.plantext2} 
        onChange={e=>setAdminInfo({...adminInfo,plantext2:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="(NOTE: This is Not)" variant="outlined" value={adminInfo.plannote} 
        onChange={e=>setAdminInfo({...adminInfo,plannote:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="LET'S UNDERSTAND" variant="outlined" value={adminInfo.planheading1} 
        onChange={e=>setAdminInfo({...adminInfo,planheading1:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="दोस्तों आज आपको एक" variant="outlined" value={adminInfo.plantext3} 
        onChange={e=>setAdminInfo({...adminInfo,plantext3:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="दोस्तों आज हम आप को एक ऐसी" 
        variant="outlined" value={adminInfo.plantext4} 
        onChange={e=>setAdminInfo({...adminInfo,plantext4:e.target.value})} 
        disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>


      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="दोस्तों इस पोस्ट में हम जानेंगे" variant="outlined" value={adminInfo.planheading2} 
        onChange={e=>setAdminInfo({...adminInfo,planheading2:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="दोस्तों आज हम Asclepius wellness" variant="outlined"
         value={adminInfo.plantext5} 
        onChange={e=>setAdminInfo({...adminInfo,plantext5:e.target.value})} disabled={!edit} 
        sx={{color:'blue'}} required/>
      </Grid>

</Grid>

<h2 >make headings in plan page</h2>

<div className='planPageHead'>

<div>
  <TextField id="outlined-basic" type="text" 
  value={mainhead}
  onChange={(e)=>setmainhead(e.target.value)}
   placeholder='Add Main Heading here'/>
  <div style={{border:"2px solid red"}}>
   {!addHeading?<Button variant="contained"
   color="secondary"
   onClick={()=>setAddHeading(!addHeading)}>
    ADD HEADING
   </Button>
   :<>
   <TextField id="outlined-basic" type="text" 
   value={plhead}
    placeholder='addHeading' 
    onChange={(e)=>setPhead(e.target.value)}/>
   <Button  variant="contained"
   color='success'onClick={submitPLhead}>Submit Heading</Button>
   </>}
   {/* //to upload photo in plans */}
   {
    <div style={{width:"80%",margin:"auto"}}>
    <input style={{width:"90px",height:"25px",
     padding:"0",backgroundColor:"red",
     marginBottom:"2%",
     borderRadius:"0"}} 
     type="file"  accept='.gif, .jpg, .png' 
     onChange={e=>setPlansImage(e)}/>
    <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
     onClick={()=>{
    submitFile(plansImage,'planGallery',adminInfo.planGallery?
    adminInfo.planGallery.length:0);
     SubmitPlanImg()}
    //  adminInfo.planGallery?adminInfo.planGallery[(adminInfo.planGallery.length-1)].src:"null"
    }>Upload</Button>
    </div>
   }
    {!addText?<Button variant="contained"
     onClick={()=>setAddText(!addText)}>
      ADD TEXT
    </Button>:
   <>
    <TextField id="outlined-basic" value={pltext}
    onChange={(e)=>setPltext(e.target.value)}
    type="text" placeholder='add simple text'/>
    <Button  variant="contained"
   color='success' onClick={submitPLtext}>Submit Text</Button>
   </>
   }

<Button  variant="contained"
   color='success'
   onClick={SubmitPlanHeading}>Submit Whole Heading</Button>

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
        onClick={()=>DELETEHEADING(item)}>DELETE This Heading</Button>
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
   onClick={()=>{setAdminInfo({...adminInfo,plans:[...adminInfo.plans]});
   saveAdminInfo()}}>
    Final Plans Submit</Button>
</div>

</div>


</div>
{/* //plans section end here  */}



















        <Grid item xs={12} sm={12}>
        {edit?
        <div  style={{display:"flex",border:"1px solid green"}} >
          <FloatingButton  color={theme.color.white}
       background={"blue"} type='submit' rightOffset = "230px" onClick={e=>{saveAdminInfo(e);
          setEdit(false);
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
       onClick={()=>setEdit(true)}
     >
       Edit Whole Profile
     </FloatingButton> 
        }
        </Grid>
    </Grid>:'Loading...'}
    </div>
  )
}
export default AdminProfile