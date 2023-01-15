import React, { useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { useState, useRef } from 'react';
import '../Styles/Images.css'
import { } from 'bootstrap-icons'

function Photo() {

  let [pics, setPics] = useState(null)

  function inputChange(e, x) {
    const file = e.target.files[x]
    let added = true;
    if (!file) return false;
    getBase64(file).then(base64 => {
      let arr = []
      if (localStorage.getItem("pictures")) {
        arr = JSON.parse(localStorage.getItem("pictures"))
      }
      if (arr.includes(base64) === false) arr.push(base64)
      else {
        alert("this file has already been added.")
        return false;
      }
      localStorage.setItem("pictures", JSON.stringify(arr))
      try {
        localStorage.setItem("pictures", JSON.stringify(arr))
      } catch (e) {
        alert("Unable to add image")
        return false
      }

      if (added) {
        setPics(JSON.parse(localStorage.getItem("pictures")))
        return true;
      }
    })

  }

   function addImages(e) {
    const files = e.target.files
    let added = true;

    for (let i = 0; i < files.length; i++) {
      added = inputChange(e, i);
    }

  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }
  function deleteImages() {
    localStorage.clear()
    alert("Images successfully cleared.")
    setPics(JSON.parse(localStorage.getItem("pictures")))
  }

  function delImage(i) {
    let arr = JSON.parse(localStorage.getItem("pictures"))
    arr.splice(i, 1);
    localStorage.setItem("pictures", JSON.stringify(arr))
    setPics(JSON.parse(localStorage.getItem("pictures")))
  }

  useEffect(() => {
    setPics(JSON.parse(localStorage.getItem("pictures")))
  }, [])

  return (
    <div className="image-holder">
      <NavigationBar text={"photo"} />
      <form onSubmit={e => { e.preventDefault(); }}>
        <h1> Please upload image files to be displayed on your screen</h1>
        <label htmlFor="file-input" className='file-label'><i class="bi bi-upload"></i>Upload Image</label>
        <input id="file-input" type="file" accept="image/jpg, image/jpeg, image/svg, image/png" multiple onChange={(e) => addImages(e)} />
      </form>
      <button className="delete-button" onClick={() => {if(confirm("Delete all images?")){deleteImages();}}}>Clear all images</button>
      <h2>View Added Images</h2>
      <div className="image-gallery">
        {pics !== null ? pics.map((img, index) => <div className="gallery-image" key={index}><i className="bi bi-x delete-image" onClick={() => delImage(index)}></i><img className="gallery-img" src={img} /></div>) : <></>}
      </div>
    </div>
  );
}
export default Photo;
