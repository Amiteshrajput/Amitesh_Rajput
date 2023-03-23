
import "./YoutubePlayer.css"
import YoutubeEmbed from './YoutubeEmbed';


const YoutubePlayer = ({embedId}) => {

   
return (
         <div className='mainBox'>
<div className='midbox'>
<div className='text'>
<h2 >𝐋𝐢𝐟𝐞 𝐜𝐡𝐚𝐧𝐠𝐢𝐧𝐠 𝐯𝐢𝐝𝐞𝐨</h2>
<h5>𝐘𝐨𝐮 𝐞𝐯𝐞𝐫 𝐬𝐞𝐞𝐦𝐞𝐝.</h5>

</div>
 <div>

 {embedId && <YoutubeEmbed  embedId={embedId}/>}
</div>
</div>

       </div>

      )

    }

export default YoutubePlayer