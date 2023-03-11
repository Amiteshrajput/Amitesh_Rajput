import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './hooks/useCountdown';
import Swal from 'sweetalert2'


const ExpiredNotice = ({type}) => {
    return (
      <div className="expired-notice">
       {type==="startingTime"?<> <span >Meeting in Progress!!!</span>
        <p>Please Register for event fastly...</p></>
        :
        <> <span style={{color:"red"}} >Meeting Ended!!!</span>
        <p>Please wait for upcoming events...</p></>}
      </div>
    );
  };

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a
       
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </a>
    </div>
  );
};

const CountdownTimer = ({ targetDate,type }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {

    if(type==="endingTime"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...!',
        text: 'Event Ended',
        footer: 'Wait for upcoming event'
      })
      // window.location.reload(false);
    }

    return <ExpiredNotice  type={type}/>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;



function AlertMsg(){
  return (
  <div>

         </div>)
}