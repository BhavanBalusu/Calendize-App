import { useState, useEffect } from 'react';
import './../Styles/Time.css'
export default function Time() {
  const [time, setTime] = useState();
  const [timeOfDay, setTimeOfDay] =  useState();
  const [dates, setDates] = useState();

  useEffect(() => {
    setInterval(() => {
      const d = new Date();
      let hr = d.getHours();
      let min = d.getMinutes();
      let stateOfDay = 'AM';
      let day = getDay(d.getDay());
      let date = getDate(d.getDate());
      let month = getMonth(d.getMonth());
      let year = d.getFullYear();

      let dates = date + " " + day + " " + month + " " + year;
      setDates(`${day}, ${month} ${date}, ${year}`);

      if (hr > 12) {
        hr -= 12;
        stateOfDay = 'PM';
      }

      if( hr === 0 && stateOfDay==='AM'){
        hr = 12;
      }
      if (min < 10) min = `0${min}`;
      setTimeOfDay(stateOfDay);
      setTime(`${hr}:${min}`);
    }, 100);
  });

  function getDate(date){
    if (date%10 === 1)
      return date + "st";
    else if (date%10 === 2)
      return date + "nd";
    else if (date%10 === 3)
      return date + "rd";
    else
      return date + "th";
  }

  function getMonth(month){
    if (month === 0)
      return "January";
    else if (month === 1)
      return "February";
    else if (month === 2)
      return "March";
    else if (month === 3)
      return "April";
    else if (month === 4)
      return "May";
    else if (month === 5)
      return "June";
    else if (month === 6)
      return "July";
    else if (month === 7)
      return "August";
    else if (month === 8)
      return "September";
    else if (month === 9)
      return "October";
    else if (month === 10)
      return "November";
    else if (month === 11)
      return "December";
    else
      return "Invalid"
  }

  function getDay(day){
    if (day === 0)
      return "Sunday";
    else if (day === 1)
      return "Monday";
    else if (day === 2)
      return "Tuesday";
    else if (day === 3)
      return "Wednesday";
    else if (day === 4)
      return "Thursday";
    else if (day === 5)
      return "Friday";
    else if (day === 6)
      return "Saturday";
    else
      return "Invalid";
  }

  return(
    <div>
      <p className="time-time">{time}<span>{timeOfDay}</span></p>
      <p className='time-date'>{dates}</p>
    </div>
  );
}
