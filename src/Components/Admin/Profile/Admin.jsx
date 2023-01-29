import React,{useEffect, useState,useContext} from 'react'
import { Button, Grid, TextField, Tooltip } from '@mui/material'
import { getDoc, setDoc, doc,collection, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig/firebaseConfig';
import {useNavigate} from 'react-router-dom'
import { ref, getDownloadURL, uploadBytesResumable,deleteObject } from "firebase/storage";
import { storage } from '../../../firebaseConfig/firebaseConfig';
import "./Admin.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { UserContext } from '../../../Contexts/UserContext';


function AdminProfile() {

  const navigate=useNavigate()
  const [edit,setEdit]=useState(false)
  const [editPhoto,setEditPhoto]=useState(false)
  // const admin=JSON.parse(sessionStorage.getItem('admin'))
  const [state,dispatch]=useContext(UserContext)

  const [adminInfo,setAdminInfo]=React.useState({
    name:'',
    about:''
  })

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

  const submitFile=(e,type,id)=>{
    e.preventDefault()
    let file = e.target[0]?.files[0] || e.target.files[0]
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
          let temp=adminInfo.photogallery.length?adminInfo.photogallery:[{src:downloadURL,fileRef:`${type}/${file.name}`,id:0}]
          if(type!=='aboutmeImage'){
            if(adminInfo.photogallery.length && id===adminInfo.photogallery.length){//Add file to end of temp
              temp=[...adminInfo.photogallery,{src:downloadURL,fileRef:`${type}/${file.name}`,id:id}]
            }
            else if(adminInfo.photogallery.length && id<adminInfo.photogallery.length){//Relpace file at index id with current file
              temp[id]={src:downloadURL,fileRef:`${type}/${file.name}`,id:id}
            }
            // else{
            //   temp=[{src:downloadURL,fileRef:`${type}/${file.name}`,id:0}]
            // }
          }
          setAdminInfo({
            ...adminInfo,
            [type==='aboutmeImage'?'aboutmeImage':'photogallery'] : 
            type==='aboutmeImage'?
             downloadURL:temp
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
  
  const deleteImage=async(fileRef,id)=>{
    let ans=window.confirm('Sure want to delete?')
    if(ans){
      // Delete the file
      const fileFullRef = ref(storage, fileRef);
      deleteObject(fileFullRef).then((e) => {
      // File deleted successfully
      saveAdminInfo(e)
      let temp=adminInfo.photogallery.filter((item)=>{return item.id!==id})
      for(let i=id;i<temp.length;i++){
        temp[i].id--;
      }
      alert('Save to make final changes')
      console.log('Inside delete Image');
      return temp
      })
      .then((temp)=>{
        setAdminInfo({...adminInfo,photogallery : temp})
        saveAdminInfo()
      })
      // .then(saveAdminInfo)  
      .catch((error) => {
      // Uh-oh, an error occurred!
      });
    }
  }

  const editDeleteImage=async(fileRef)=>{
    let ans=window.confirm('Sure want to change photo?')
    if(ans){
      const fileFullRef = ref(storage, fileRef);
      deleteObject(fileFullRef).then(async(e) => {
        // File deleted successfully
        console.log('Inside editDeleteImage')
        saveAdminInfo(e)
        }).catch((error) => {
        // Uh-oh, an error occurred!
        });
      // Delete the file
      alert('Save to make final changes')
    }
  }

  useEffect(()=>{fetchAdminInfo()},[])

  return (
    <div className='Admin'>
    <Grid container spacing={2} sx={{color:'blue',}}>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" 
        value={adminInfo.name} onChange={e=>setAdminInfo({...adminInfo,name:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{}}>
        <TextField id="outlined-basic" label="Profession"
       
         InputLabelProps={{
           shrink: true,
         }} variant="outlined" value={adminInfo.profession} onChange={e=>setAdminInfo({...adminInfo,profession:e.target.value})} disabled={!edit} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'blue'}}>
        <TextField  InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Education & Experience" variant="outlined" value={adminInfo.educationAndExperience} onChange={e=>setAdminInfo({...adminInfo,educationAndExperience:e.target.value})} disabled={!edit} required/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Commitment1" variant="outlined" value={adminInfo.commitment1} onChange={e=>setAdminInfo({...adminInfo,commitment1:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Commitment2" variant="outlined" value={adminInfo.commitment2} onChange={e=>setAdminInfo({...adminInfo,commitment2:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Commitment3" variant="outlined" value={adminInfo.commitment3} onChange={e=>setAdminInfo({...adminInfo,commitment3:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-basic" label="Commitment4" variant="outlined" value={adminInfo.commitment4} onChange={e=>setAdminInfo({...adminInfo,commitment4:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6}  sx={{ color:'blue'}}>
        <TextField InputLabelProps={{
           shrink: true,
         }} id="outlined-multiline-flexible"
        label="About"
        multiline
        maxRows={4} variant='outlined' required fullWidth value={adminInfo.about} onChange={e=>setAdminInfo({...adminInfo,about:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={6}>
          {edit?
          <form onSubmit={e=>{submitFile(e,'aboutmeImage')}}>
            <input type="file" 
            accept='.gif, .jpg,.jpeg, .png'
            required/>
            {progresspercent>0 && progresspercent<=100?
            <div>{progresspercent}%
            </div>:
            <Button type='submit' sx={{}}>Upload</Button>
            }
          </form>:
          (adminInfo.aboutmeImage?
           <Button onClick={()=>window.open(adminInfo.aboutmeImage,'_blank')}  sx={{}}>View Photo</Button>:
           <Button onClick={()=>setEdit(true)} sx={{}}>Upload Photo</Button>)}
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
            <Button startIcon={<CameraAltIcon />} variant="contained" size="small" onClick={()=>submitFile(photogalleryFile,'photogallery',adminInfo.photogallery?adminInfo.photogallery.length:0)}>Upload Photo </Button>
          </div>:''}

          <div className='photosCards'>
            {!adminInfo.photogallery?<h4>'Loading...'</h4>:adminInfo.photogallery.map((item)=>{
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
                    type="file"  accept='.gif, .jpg, .png' onChange={e=>setPhotoGalleryFile(e)}/>
                    <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
                    onClick={()=>{setEditPhoto(false);
                        submitFile(photogalleryFile,'photogallery',item.id)}}>Upload</Button>
                      <Button variant="contained" size="small"
                      sx={{backgroundColor:"green"}} onClick={()=>{setEditPhoto(false)}}>Cancel</Button>  
                   </div>:
                  <Button size="small"   variant="contained"
                              
                   onClick={()=>{ setEditPhoto(item.id);
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
        <Grid item xs={12} sm={12}>
        {edit?
        <Grid item xs={12} sm={12}>
          <Button type='submit' xs={6} sm={6} onClick={e=>{saveAdminInfo(e);
          setEdit(false);setEditPhoto(false)}}>Save</Button>
          <Button xs={6} sm={6} onClick={()=>{setEdit(false);setEditPhoto(false)}}>Cancel</Button>
        </Grid>:
        <Button onClick={()=>setEdit(true)}>Edit</Button>}
        </Grid>
    </Grid>
    </div>
  )
}
export default AdminProfile


