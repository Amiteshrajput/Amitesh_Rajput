import React from 'react'
import "./Admin.css"
import { useState } from 'react';
import { Grid,TextField,Button } from '@mui/material';
import { Markup } from 'interweave';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { async } from '@firebase/util';

function PlanSection({adminInfo,setAdminInfo,edit,submitFile,saveAdminInfo,imgUrl}) {
    const [mainhead,setmainhead]=useState('')
    const [innertext,setInnertext]=useState('')
    const [plhead,setPhead]=useState('');
    const [pltext,setPltext]=useState('');
    const [show,setShow]=useState(false)
    const [addHeading,setAddHeading]=useState(false)
    const [addText,setAddText]=useState(false)
    const [plansImage, setPlansImage] = useState()

    console.log("Admininfo from plan",adminInfo)

function submitPLhead(){
setInnertext(prev=>prev+`<h1>${plhead}</h1>`)
setPhead('')
}

function submitPLtext(){
setInnertext(prev=>prev+`<p>${pltext}</p>`)
setPltext('')
}


 function SubmitPlanImg(imgUrl){
 if(adminInfo?.planGallery?.length>0){
  setInnertext(prev=>prev+`<img src=${imgUrl}  
  alt="imb"/>`)
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

<div className='PlanSection'>
{/* //plans section start from here  */}
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
   onClick={
    ()=>{
      new Promise((resolve,reject)=>resolve(
        submitFile(plansImage,'planGallery',adminInfo.planGallery?adminInfo.planGallery.length:0)
        
      )).then((url)=>{console.log("msg",url)
       SubmitPlanImg()})
       
    }
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
 saveAdminInfo();
 alert("PLAN Submitted successfully")}}>
  Final Plans Submit</Button>
</div>

</div>

{/* //plans section end here  */}
</div>




  )
//     <div className='PlanSection'>

//   <h1 >Plans section</h1>
//   <Grid container spacing={2} sx={{color:'blue',padding:"2%"}}>
//       <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
//         <TextField id="outlined-basic" label="We Help" variant="outlined" value={adminInfo.plantext1
//         } 
//         onChange={e=>setAdminInfo({...adminInfo,plantext1:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
//       </Grid>
//       <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
//         <TextField id="outlined-basic" label="We Don't Need Your Money" variant="outlined" value={adminInfo.plantext2} 
//         onChange={e=>setAdminInfo({...adminInfo,plantext2:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
//       </Grid>
//       <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
//         <TextField id="outlined-basic" label="(NOTE: This is Not)" variant="outlined" value={adminInfo.plannote} 
//         onChange={e=>setAdminInfo({...adminInfo,plannote:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
//       </Grid>
//       <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
//         <TextField id="outlined-basic" label="LET'S UNDERSTAND" variant="outlined" value={adminInfo.planheading1} 
//         onChange={e=>setAdminInfo({...adminInfo,planheading1:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
//       </Grid>
//       <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
//         <TextField id="outlined-basic" label="दोस्तों आज आपको एक" variant="outlined" value={adminInfo.plantext3} 
//         onChange={e=>setAdminInfo({...adminInfo,plantext3:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
//       </Grid>

//       <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
//         <TextField id="outlined-basic" label="दोस्तों आज हम आप को एक ऐसी" 
//         variant="outlined" value={adminInfo.plantext4} 
//         onChange={e=>setAdminInfo({...adminInfo,plantext4:e.target.value})} 
//         disabled={!edit} sx={{color:'blue'}} required/>
//       </Grid>


//       <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
//         <TextField id="outlined-basic" label="दोस्तों इस पोस्ट में हम जानेंगे" variant="outlined" value={adminInfo.planheading2} 
//         onChange={e=>setAdminInfo({...adminInfo,planheading2:e.target.value})} disabled={!edit} sx={{color:'blue'}} required/>
//       </Grid>

//       <Grid item xs={12} sm={6} sx={{ color:'inherit'}}>
//         <TextField id="outlined-basic" label="दोस्तों आज हम Asclepius wellness" variant="outlined"
//          value={adminInfo.plantext5} 
//         onChange={e=>setAdminInfo({...adminInfo,plantext5:e.target.value})} disabled={!edit} 
//         sx={{color:'blue'}} required/>
//       </Grid>

// </Grid>

// <h2 >make headings in plan page</h2>

// <div className='planPageHead'>

// <div>
//   <TextField id="outlined-basic" type="text" 
//   value={mainhead}
//   onChange={(e)=>setmainhead(e.target.value)}
//    placeholder='Add Main Heading here'/>
//   <div style={{border:"2px solid red"}}>
//    {!addHeading?<Button variant="contained"
//    color="secondary"
//    onClick={()=>setAddHeading(!addHeading)}>
//     ADD HEADING
//    </Button>
//    :<>
//    <TextField id="outlined-basic" type="text" 
//    value={plhead}
//     placeholder='addHeading' 
//     onChange={(e)=>setPhead(e.target.value)}/>
//    <Button  variant="contained"
//    color='success'onClick={submitPLhead}>Submit Heading</Button>
//    </>}
//    {/* //to upload photo in plans */}
//    {
//     <div style={{width:"80%",margin:"auto"}}>
//     <input style={{width:"90px",height:"25px",
//      padding:"0",backgroundColor:"red",
//      marginBottom:"2%",
//      borderRadius:"0"}} 
//      type="file"  accept='.gif, .jpg, .png' 
//      onChange={e=>setPlansImage(e)}/>
//     <Button startIcon={<CameraAltIcon />} variant="contained" size="small" 
//      onClick={async()=>{
//       submitFile(plansImage,'planGallery',adminInfo.planGallery?adminInfo.planGallery.length:0);SubmitPlanImg()}
//     }>Upload</Button>
//     </div>
//    }
//     {!addText?<Button variant="contained"
//      onClick={()=>setAddText(!addText)}>
//       ADD TEXT
//     </Button>:
//    <>
//     <TextField id="outlined-basic" value={pltext}
//     onChange={(e)=>setPltext(e.target.value)}
//     type="text" placeholder='add simple text'/>
//     <Button  variant="contained"
//    color='success' onClick={submitPLtext}>Submit Text</Button>
//    </>
//    }

// <Button  variant="contained"
//    color='success'
//    onClick={SubmitPlanHeading}>Submit Whole Heading</Button>

//   </div>

//   <h1 style={{backgroundColor:"red"}}>
//     {mainhead}
//   </h1>
//   <div>
//   <Markup content={innertext} />
//   </div>


// </div>
// <div className='ShowHeading'>
  
//   {
//     adminInfo?.plans?.map((item,index)=>{
//       return (
//       <div key={item.mainHead}>
//         <Button variant="contained" color='error' 
//         onClick={()=>DELETEHEADING(item)}>DELETE This Heading</Button>
//         <h3 style={{backgroundColor:"yellow",marginTop:"2%",textAlign:"center"}} 
//         onClick={()=>{if(show===false)setShow(index)
//         else setShow(false);{console.log("show",show)}}}>
//           {item.mainHead}</h3>
//          { show===index &&
//           <Markup content={item.innertext}/>
//          }

//       </div>)
//     })
//   }

//   <Button variant="contained" color='success'
//    onClick={()=>{setAdminInfo({...adminInfo,plans:[...adminInfo.plans]});
//    saveAdminInfo()}}>
//     Final Plans Submit</Button>
// </div>

// </div>


// </div>

 // )
}

export default PlanSection