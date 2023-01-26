import React,{useEffect, useState} from 'react'
import { Button, Divider, Grid, TextField, Tooltip } from '@mui/material'
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebaseConfig/firebaseConfig';
import {useNavigate} from 'react-router-dom'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../firebaseConfig/firebaseConfig';
import "./Admin.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


function AdminProfile() {

  const navigate=useNavigate()
  const [edit,setEdit]=useState(false)
  const admin=JSON.parse(localStorage.getItem('admin'))

  const [adminInfo,setAdminInfo]=React.useState({
    name:'',
    about:''
  })

  const fetchAdminInfo=async()=>{
    const docRef = doc(db, "usersData", admin.uid);
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
      await setDoc(doc(db, "usersData", admin.uid),{...adminInfo})
      .then(async ()=>{await setDoc(doc(db, "usersData", 'it145zGVbxyLdl4DFOQh'),{...adminInfo,email:''})})
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
    <div className='Admin'>
    <Grid container spacing={2} sx={{color:'blue',backgroundColor:'white'}}>
      <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={adminInfo.name} onChange={e=>setAdminInfo({...adminInfo,name:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
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
          setEdit(false)}}>Save</Button>
          <Button xs={6} sm={6} onClick={()=>setEdit(false)}>Cancel</Button>
        </Grid>:
        <Button onClick={()=>setEdit(true)}>Edit</Button>}
      </Grid>

     
<div className='mainbox'>
  <h1 >Photo Gallery</h1>

<div style={{display:"flex",width:"80%",margin:"auto"}}>
  <input type="file"  accept='.gif, .jpg, .png' />
  <Button startIcon={<CameraAltIcon />} variant="contained" size="small">Upload Photo </Button>
</div>

<div className='photosCards'>
{
  photos.map((item)=>{
    return <div className='card' key={item.src} >
      <img  className='card'  width="100%" 
      height='100%'  
      src={item.src}/>

<div style={{display:"flex",justifyContent:"space-between",
position:"absolute",top:"1%",left:"1%"}}>
<Tooltip  title="Edit This Img" followCursor>
     <Button size="small"   variant="contained"  >
     Edit
</Button>
</Tooltip>

<Tooltip title="Delete This Img" followCursor>
     <Button size="small" sx={{marginLeft:"5%"}}
     variant="contained" color="error" startIcon={<DeleteIcon />}>
     Delete
</Button>
</Tooltip>
</div>

      </div>
  })

}
</div>

</div>
        

    </Grid>
  </div>
  )
}
export default AdminProfile





var photos = [
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