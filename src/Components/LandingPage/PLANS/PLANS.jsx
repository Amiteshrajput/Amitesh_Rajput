import React from 'react'
import { useState } from 'react'
import "./PLANS.css"
import { Markup } from 'interweave'

const PLANS = ({
  planheading1,
  planheading2,
  plannote,
  plantext1,
  plantext2,
  plantext3,
  plantext4,
  plantext5,AdmininfoPlan
}) => {
  const [show,setShow]=useState(false)


  return (
    <div className='mainPlan' id='plan'>

<div className='mainPlansec'>
<p>{plantext1}</p>
<p>
  {plantext2}
{/* We Don't Need Your Money, We Need Your Time 
<b>&nbsp;Asclepiuswellness = Learning + Earning</b> The Mission 
of awpl is to Produce Maximum Young Entrepreneurs 
in india. What You Learn? You Need Following Skills
 to Become <b>&nbsp;Highly Successful</b> in 21st Century. */}

</p>

<p style={{marginTop:"3%",
color:"red"}}>
 {plannote}
 </p>


<p style={{marginTop:"3%",fontWeight:"700",fontSize:"30px"}}>{planheading1}</p>

<p style={{marginTop:"3%"}}>
{plantext3}
</p>

<img width='100%' src='https://1.bp.blogspot.com/-2Z1Swpga7Mg/YDJnNUstYBI/AAAAAAAARlE/D7uncqeIhyE8MItcmBU5DVIb2-kUVZ8zQCNcBGAsYHQ/s16000/4.png'/>
<p>
{plantext4}
</p>


<p style={{marginTop:"3%",fontSize:'28px',marginBottom:"4%"}}>
{planheading2}
</p>

<p>
{plantext5}
</p>

{
    AdmininfoPlan?.map((item,index)=>{
      return (
      <div key={item.mainHead}>
        
        <h3 className='headingplan' style={{backgroundColor:"yellow",marginTop:"2%",textAlign:"center",
        padding:"1%",fontWeight:"600"}} 
        onClick={()=>{if(show===false)setShow(index)
        else setShow(false);{console.log("show",show)}}}>
          {item.mainHead}</h3>
        <div className='plansKoSetkro'> { show===index &&
          <Markup content={item.innertext}/>
         }
        </div>

      </div>)
    })
  }

</div>

</div>
  )
}

export default PLANS


