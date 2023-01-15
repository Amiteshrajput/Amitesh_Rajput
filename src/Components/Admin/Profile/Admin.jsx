import React,{useEffect, useState} from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebaseConfig/firebaseConfig';
import {useNavigate} from 'react-router-dom'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../firebaseConfig/firebaseConfig';

function AdminProfile() {

  const navigate=useNavigate()
  const [edit,setEdit]=useState(false)
  const admin=JSON.parse(localStorage.getItem('admin'))

  const [adminInfo,setAdminInfo]=React.useState({
    name:'',
    about:''
  })

  const fetchAdminInfo=async()=>{
    const docRef = doc(db, "adminData", admin.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setAdminInfo(docSnap.data())
      // setLoading(false)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const saveAdminInfo=async(e)=>{
    e.preventDefault();
    try {
      await setDoc(doc(db, "adminData", admin.uid),{...adminInfo});
      alert("Admin details saved successfully!")
      navigate('/admin/profile')
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);  
  const submitFile=(e)=>{
    e.preventDefault()
    const file = e.target[0]?.files[0]
    console.log(e,file)
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          setAdminInfo({
            ...adminInfo,
            aboutmeImage:downloadURL
          })
          setProgresspercent(0)
          alert('Save to make final changes')
        });
      }
    );
  }

  useEffect(()=>{fetchAdminInfo()},[])

  return (
    <div>
    <Grid container spacing={2} sx={{color:'blue',backgroundColor:'white'}}>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={adminInfo.name} onChange={e=>setAdminInfo({...adminInfo,name:e.target.value})} disabled={!edit} sx={{color:'blue'}}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField id="outlined-basic" label="Profession" variant="outlined" value={adminInfo.profession} onChange={e=>setAdminInfo({...adminInfo,profession:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField id="outlined-basic" label="Education & Experience" variant="outlined" value={adminInfo.eduExperience} onChange={e=>setAdminInfo({...adminInfo,educationAndExperience:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField id="outlined-basic" label="Commitment1" variant="outlined" value={adminInfo.commitment1} onChange={e=>setAdminInfo({...adminInfo,commitment1:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField id="outlined-basic" label="Commitment2" variant="outlined" value={adminInfo.commitment2} onChange={e=>setAdminInfo({...adminInfo,commitment2:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField id="outlined-basic" label="Commitment3" variant="outlined" value={adminInfo.commitment3} onChange={e=>setAdminInfo({...adminInfo,commitment3:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6} sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField id="outlined-basic" label="Commitment4" variant="outlined" value={adminInfo.commitment4} onChange={e=>setAdminInfo({...adminInfo,commitment4:e.target.value})} disabled={!edit}/>
      </Grid>
      <Grid item xs={12} sm={6}  sx={{backgroundColor:'transparent', color:'blue'}}>
        <TextField id="outlined-multiline-flexible"
        label="About"
        multiline
        maxRows={4} variant='outlined' required fullWidth value={adminInfo.about} onChange={e=>setAdminInfo({...adminInfo,about:e.target.value})} disabled={!edit}/>
      </Grid>
      {/* <Grid item xs={12} sm={6}>
        {view?<><img src={adminInfo.aboutmeImage} alt="" width='100%'/><Button onClick={()=>setView(false)}>Back</Button></>
        :<Button onClick={()=>setView(true)}>View Photo</Button>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <input type='file' onInput={e=>{console.log(e.target.value)}}/>
      </Grid> */}
      <Grid item xs={6}>
          {edit?
          <form onSubmit={e=>{submitFile(e)}}>
            <input type="file" 
            // accept='application/img'
            accept='.gif, .jpg, .png'
            />
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
          setEdit(false)}}>Save</Button>
          <Button xs={6} sm={6} onClick={()=>setEdit(false)}>Cancel</Button>
        </Grid>:
        <Button onClick={()=>setEdit(true)}>Edit</Button>}
      </Grid>
    </Grid>
  </div>
  )
}
export default AdminProfile