import React from 'react'
import { useState } from 'react'
import "./PLANS.css"

const PLANS = ({
  planheading1,
  planheading2,
  plannote,
  plantext1,
  plantext2,
  plantext3,
  plantext4,
  plantext5
}) => {
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

<Heading1 />

</div>

</div>
  )
}

export default PLANS



function Heading1(){
  const [show,setShow]=useState(false)
  return(
    <div style={{scrollBehavior:"smooth",marginTop:"3%"}}>
    <p style={{backgroundColor:"orange",cursor:"pointer",padding:"1%",
  marginBottom:"3%",fontWeight:"600"}} onClick={()=>{setShow(!show)}}>
    Asclepius wellness क्या है?
    </p>
    {
      show&&
     <div> 
      <p>
        AWPL भारत सरकार की legal direct selling company list में से एक है और इस कंपनी को भारत में MLM Business Plan चलाने की अनुमति है।Asclepius ग्रीक भाषा का शब्द है, जिसका मतलब होता है, दवाइयो के भगवान। AWPL, हर्बल हेल्थ, सप्लीमेंट व बीयूटी प्रोडक्ट की निर्माता कंपनी है, जिसकी मैन्युफैक्चरिंग यूनिट जयपुर, राजस्थान में स्थित है। AWPL इन्ही प्रोडक्ट की बिक्री व मार्केटिंग अपने प्रत्येक्ष विक्रेता यानी Direct Sellers से करवाती है।
      </p>
      <p style={{marginTop:"2%",}}>
      AWPL भारत सरकार की legal direct selling company list में से एक है और इस कंपनी को भारत में MLM Business Plan चलाने की अनुमति है।Asclepius ग्रीक भाषा का शब्द है, जिसका मतलब होता है, दवाइयो के भगवान। AWPL, हर्बल हेल्थ, सप्लीमेंट व बीयूटी प्रोडक्ट की निर्माता कंपनी है, जिसकी मैन्युफैक्चरिंग यूनिट जयपुर, राजस्थान में स्थित है। AWPL इन्ही प्रोडक्ट की बिक्री व मार्केटिंग अपने प्रत्येक्ष विक्रेता यानी Direct Sellers से करवाती है।
      </p>
      <h2 style={{marginTop:"2%",}}>
      क्या AWPL से जुड़ना चाहिए?
        </h2>
        <p style={{marginTop:"2%",}}>
        यह फैसला पूरी तरह से आपका होना चाहिए। सबसे पहले आपको MLM को अच्छे से समझना होगा।
      </p>
      <p style={{marginTop:"2%",}}>
      MLM क्या है ? MLM मे किन स्किल्स की जरूरत होती है ? और क्या मै MLM कर पाऊँगा ?
      </p>
      <p style={{marginTop:"2%",}}>
      आपकी जानकारी के लिए बता दे, कि MLM में सफल होने के लिए 2 से 3 साल लगातार मेहनत की जरूरत होती है।
      </p>
      <p style={{marginTop:"2%",}}>
      MLM के बाद आपको AWPL का प्लान पेपर पर पूरा समझना होगा। ये जानने के बाद ही फैसला करे, कि कितनी पर्सनल और डाउनलाइन सेल्स पर कितनी इनकम होगी। अन्यथा ऐसा होगा, कि आपको तैरना नहीं आता और सीधे समुन्द्र मे कूद गए। इन सबके बाद ही आप MLM में कदम रखने का सोचे, क्योकि सिर्फ खाली दिखावे और किसी के कहने पर ना जुड़े। क्योकि जुड़ने के बाद आपके परिवार व दोस्तो पर भी इसका प्रभाव रहेगा।

      </p>


      </div>
    }

    </div>
  )
}