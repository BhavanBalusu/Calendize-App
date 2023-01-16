import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/NavigationBar.css'
import { logout } from '../firebase';
import { dir } from 'console';

function NavigationBar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const nav = useNavigate();
  // if (props.text !== null) {
  //   const underline = document.querySelector("." + props.text);
  //   if (underline !== null)
  //     underline.style.borderBottom = "4px solid rgb(121, 25, 159)"
  // }
  const navigate = (direction) => {
    nav("/" + direction);
    setNavbarOpen(false);
    return;
  }
  return (
    <>
      <div className="navbar-container">
        <i onClick={() => { setNavbarOpen(true) }}className="bi bi-list"></i>
      </div>
      <div className={`menuNav ${navbarOpen ? " showMenu" : " closeMenu"}`}>
          <button className="close">
            <i onClick={() => { setNavbarOpen(false) }} className="bi bi-x-lg"></i>
          </button>
        <div className="button-holder">
          <button className="disp" onClick={() => { navigate("disp"); setNavbarOpen(false); }}>
            Display
          </button>
          <button className="photo" onClick={() => { navigate("photo"); setNavbarOpen(false); }}>
            Import Photos
          </button>
          <a href='http://localhost:3000/dash' target="_blank" rel="noreferrer">
          <button onClick={()=>setNavbarOpen(false)}>
            Edit Display
          </button>
          </a>
          <button className='photo' onClick={() => location.reload()}>Reload Page</button>
        </div>
        <div className='logout-holder'>
            <button className="logout" onClick={() => { logout(); location.reload() }} >
              Logout
            </button>
        </div>
      </div>
    </>

  );

}

export default NavigationBar;
