import React,{useState} from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebaseConfig/firebaseConfig';
import {useNavigate} from 'react-router-dom'
import "./Admin.css"
function AdminProfile() {

  const [view,setView]=useState(false)
  return (
    <form onSubmit={e=>e.preventDefault()} >
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField id="outlined-basic" label="Name" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="outlined-multiline-flexible"
        label="About"
        multiline
        maxRows={4} variant='outlined' required fullWidth/>
      </Grid>
      <Grid item xs={12} sm={6}>
        {view?<img src="https://1.bp.blogspot.com/-_7mec7UP7Vk/YCaU8HJ9-pI/AAAAAAAAQiY/5EBaXCW7rFwe4VrIQY7bLpkksssI_NvlwCNcBGAsYHQ/s16000/1.jpg" alt="" width='100%'/>
        :<Button onClick={()=>setView(true)}>View Photo</Button>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <input type='file'/>
      </Grid>
    </Grid>
  </form>
  )
}

export default AdminProfile