import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './HorizontalOne.css';
import './HorizontalTwo.css';
import './VerticalOne.css';
import './VerticalTwo.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Weather from './Components/Weather';
// import Time from './Components/Time';
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  onSnapshot,
} from 'firebase/firestore';

import Sign from './Components/SignIn';
import Register from './Components/Register';
import Reset from './Components/Reset';
import EventsHolder from './Components/EventsHolder';
import NavigationBar from './Components/NavigationBar';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Photo from './Components/Photo';
import Time from './Components/Time';
import RssLinkHolder from './Components/RssLinkHolder';
import { type } from 'os';

const Main = () => {
  const startTimer = () => (hideElements = setInterval(hideMouse, 3000));
  // IpcRenderer.send('fullscreen-window');
  window.electron.ipcRenderer.sendMessage('go-to-fullscreen');
  const imgRef = useRef<HTMLImageElement>();
  let index = 1;
  const [user, setUser] = useState('');
  const [currUser, loading] = useAuthState(auth);
  const [layout, setLayout] = useState('');

  async function getUser() {
    if (currUser == null) {
      return;
    }
    try {
      const q = query(
        collection(db, 'users'),
        where('uid', '==', currUser?.uid)
      );
      const userDoc = await getDocs(q);
      const userID = userDoc.docs[0].id;
      const data = userDoc.docs[0].data();
      setUser(userID);
      console.log(data.layout);
      setLayout(data.layout);
    } catch (err) {
      console.log(err);
      alert('An error had occurred while fetching the users name');
      return;
    }
  }

  async function loadData() {
    await getUser();
    if (user !== '') {
      fetch('https://calendize-backend.onrender.com/addCalendar', {
        method: 'POST',
        body: JSON.stringify({ user }),
        mode: 'no-cors',
      });
    }
  }

  // useEffect(() => {
  //   const func = async () => {
  //     await getUserLayout();
  //   }

  //   func()

  // }, [currUser])

  // const getUserLayout = async () => {
  //   if (currUser == null) {
  //     return;
  //   }
  //   try {
  //     const q = query(
  //       collection(db, 'users'),
  //       where('uid', '==', currUser?.uid)
  //     );
  //     const userDoc = await getDocs(q);
  //     const userID = userDoc.docs[0].id;
  //     const unsub = onSnapshot(doc(db, "users", userID), (doc) => {
  //       setLayout(userDoc.docs[0].data().layout);
  //     })

  //   } catch (err) {
  //     console.log(err);
  //     alert('An error had occurred while fetching the users name');
  //     return;

  //   }
  // }

  const hideMouse = () => {
    const getMouseCoords = () => {
      let body = document.querySelector('body');
      if (body !== null) body.style.cursor = 'auto';

      let btn = document.querySelector('.sign-out-button');
      btn?.classList.add('move-down');
    };

    let onBtn = false;

    let body = document.querySelector('body');
    if (body !== null) body.style.cursor = 'none';

    let btn = document.querySelector('.sign-out-button');

    btn?.addEventListener('mouseover', () => {
      onBtn = true;
      clearInterval(hideElements);
    });

    btn?.addEventListener('mouseout', () => {
      // startTimer();
    });

    if (body !== null) body.style.cursor = onBtn ? 'auto' : 'none';
    if (!onBtn) {
      btn?.classList.remove('move-down');
    } else {
      btn?.classList.add('move-down');
    }

    onBtn = false;

    document.onmousemove = getMouseCoords;
  };

  useEffect(() => {
    let images = JSON.parse(localStorage.getItem('pictures'));
    if (images !== undefined && images !== null) {
      imgRef.current?.setAttribute('src', images[0]);
    }
    loadData();
  }, [currUser, user]);

  const changeImage = () => {
    let images = JSON.parse(localStorage.getItem('pictures'));
    if (images === undefined || images === null) return;
    if (index === images.length) index = 0;
    if (index < images.length && imgRef !== undefined)
      imgRef.current?.setAttribute('src', images[index]);
    index++;
  };

  let hideElements = setInterval(hideMouse, 3000);
  // changeImage();
  let chngImg = setInterval(changeImage, 1000 * 10);

  const HorizontalOne = () => {
    return (
      <div className="component-holder">
        <NavigationBar text={'disp'} />

        <img className="bg-image" src="" alt="" width={100} ref={imgRef} />
        <div className="first-horizontal-bar">
          <div className="temp1">
            <Weather />
          </div>
          <div className="temp2">
            <Time />
          </div>
          <div className="temp3">
            <RssLinkHolder uid={user} />
          </div>
        </div>
        <div className="events-component-holder">
          <EventsHolder />
        </div>
      </div>
    );
  };

  const HorizontalTwo = () => {
    return (
      <div className="horizontal-two-holder">
        <div className="image-time-holder">
          <NavigationBar text={'disp'} />
          <div className="timeWidget">
            <Time />
          </div>
          <img className="bg-image" src="" alt="" ref={imgRef} />
        </div>
        <div className="widgets-holder">
          <div className="box1">
            <Weather />
            <RssLinkHolder uid={user} />
          </div>
          <div className="box2">
            <EventsHolder />
          </div>
        </div>
      </div>
    );
  };

  const VerticalOne = () => {
    return (
      <div className="component-holder">
        <NavigationBar text={'disp'} />
        <img className="bg-image" src="" alt="" width={100} ref={imgRef} />
        <div className="first-vertical-bar">
          <Time />
        </div>
        <div className="second-vertical-bar">
          <div className="box1">
            <Weather />
          </div>
          <div className="box2">
            <RssLinkHolder uid={user} />
          </div>
        </div>
        <div className="third-vertical-bar">
          <EventsHolder />
        </div>
      </div>
    );
  };

  const VerticalTwo = () => {
    return (
      <div className="component-holder two">
        <NavigationBar text={'disp'} />
        <img className="bg-image" src="" alt="" width={100} ref={imgRef} />
        <div className="first-vertical-bar">
          <Time />
        </div>

        <div className="second-second-vertical-bar">
          <div className="second-vertical-bar">
            <div className="box1">
              <Weather />
            </div>
            <div className="box2">
              <RssLinkHolder uid={user} />
            </div>
          </div>
          <div className="second-third-vertical-bar">
            <EventsHolder />
          </div>
        </div>
      </div>
    );
  };

  function finalLayout() {
    if (layout === 'H1') {
      return <HorizontalOne />;
    } else if (layout === 'H2') {
      return <HorizontalTwo />;
    } else if (layout === 'V1') {
      return <VerticalOne />;
    } else {
      return <VerticalTwo />;
    }
  }

  return finalLayout();
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />;
        <Route path="/disp" element={<Main />} />;
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="photo" element={<Photo />} />
      </Routes>
    </Router>
  );
}
