import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../Styles/Event.css'

export default function Event(props) {
  const [red, setRed] = useState();
  const [green, setGreen] = useState();
  const [blue, setBlue] = useState();

  const randColor = () => {
      setRed(Math.floor(Math.random() * 220 + 35))
      setGreen(Math.floor(Math.random() * 220 + 35))
      setBlue(Math.floor(Math.random() * 220 + 35))
  }

  useEffect(() => {
    randColor()
  },[])

  let delInterval = setInterval(() => { }, 1000)
  const del = async (e) => {
    console.log("in delete method!")
    clearInterval(delInterval)
    await deleteDoc(
      doc(db, 'users', props.event.user, 'events', props.event.docID)
    );
  };

  let deleted = false;
  delInterval = setInterval(async () => {
    const today = new Date();
    if (!deleted && today > props.event.end) {
      await del(props.event.docID);
      deleted = true
    }
  }, 2000)


  return (
    <>
      <div className="event" style={{ borderColor: `rgb(${red}, ${green}, ${blue})` }} >
        <p className='time'>{props.event.start_time} - {props.event.end_time}</p>
        <p style={{textAlign:"center"}} >{props.event.name}</p>
        <p>{props.event.details}</p>
      </div>
    </>

  );
}
