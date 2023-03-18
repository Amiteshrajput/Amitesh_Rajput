import React, { useEffect, useRef } from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './testimonials.css';
import YoutubeEmbed from '../YoutubePlayer/YoutubeEmbed';

const YoutubeTestimonials = ({testimonials}) => {
  const refContainer = useRef(null);
  useEffect(() => { 
   setTimeout(()=>{
    refContainer.current.scrollIntoView({ behavior: "smooth",block: "start", inline: "nearest"  }); 
   },2000)
  }
  ,[])

  return (
    <section id="testimonialss" ref={refContainer}>
      <h5>Feedback from my peers</h5>
      <h2>Testimonials</h2>
      <Swiper 
        className="container testimonials__container"
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
        >
        {testimonials.map((test,index) => (
          <SwiperSlide className="testimonial" key={test.link+index.toString()}>
          <YoutubeEmbed  embedId={test.link.split("").splice(test.link.lastIndexOf("/")+1).join("")}/>
          <h5 className='client__name'>{test.name}</h5>
           <small className="client__review">{test.text}</small>
        </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default YoutubeTestimonials