
import React, { useEffect, useState, useRef } from 'react';
import './../Styles/Rss.css'
import PlaceholderLoading from 'react-placeholder-loading'

function RssLinkHolder(props) {
  // const [currUser, loading] = useAuthState(auth);
  const [rssData, setRssData] = useState([[]])
  const [user, setUser] = useState('');
  const newsRef = useRef();
  let newsData = [[]]
  const [title, setTitle] = useState([]);
  const [date, setDate] = useState([]);
  const [source, setSource] = useState([]);
  // async function getUser() {
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

  //     setUser(userID);
  //   } catch (err) {
  //     console.log(err);
  //     alert('An error had occurred while fetching the users name Bhavan');
  //     return;
  //   }
  // }

  async function loadData() {
    if (user !== '') {
      await fetch('https://calendize-backend.onrender.com/readRssLinks', {
        method: 'POST',
        body: JSON.stringify({ user })
      })
        .then((res) => { res.json().then(data => setRssData(data)).catch((e) => { console.log(e) }) })
        .catch((e) => { console.log(e) })
    }
  }

  useEffect(() => {
    setUser(props.uid)
    console.log(user)
    loadData();
  }, [user, props.uid]);

  useEffect(() => {
    newsData = rssData;
    console.log(newsData)
    if (newsData !== null)
      changeNews()
  }, [rssData])

  const newsIndex = () => {
    // if(rssData.length === null)
    //   return;
    let newsSrc1 = parseInt(Math.random() * rssData.length);


    let newsSrc2 = parseInt(Math.random() * rssData.length);

    let index1 = 0;
    let index2 = 0;
    if (rssData[newsSrc1] !== undefined)
      index1 = parseInt(Math.random() * (rssData[newsSrc1].length - 1)) + 1;
    if (rssData[newsSrc2] !== undefined)
      index2 = parseInt(Math.random() * (rssData[newsSrc2].length - 1)) + 1;
      while(index2===index1)
        index2 = parseInt(Math.random() * (rssData[newsSrc2].length - 1)) + 1;
    console.log(rssData)
    return [[newsSrc1, index1],[newsSrc2, index2]];
  }


  const changeNews = () => {
    let indexes = newsIndex()

    if (newsData[indexes[0][0]] === undefined || newsData[indexes[0][0]][indexes[0][1]] === undefined)
      return
    let date1, title, summary, source = ""
    let date2, title2, summary2, source2 = ""

    try {
      title = newsData[indexes[0][0]][indexes[0][1]][0]
    }
    catch (e) {
      console.log(e + " title " + indexes[0][0] + " " + indexes[0][1]);

    }
    try {
      date1 = newsData[indexes[0][0]][indexes[0][1]][1]
      console.log(date1)
    }
    catch (e) {
      console.log(e + " date1 " + indexes[0][0] + " " + indexes[0][1]);
    }
    try {
      source = newsData[indexes[0][0]][0]
    }
    catch (e) {
      console.log(e + " header " + indexes[0][0] + " " + indexes[0][1]);
    }

    if (title !== undefined && date1 !== undefined) {
      let innerData = title + " | "  + date1 + " | " + source;
      setTitle([title, '']);
      // setSummary(summary);
      setDate([date1, '']);
      setSource([source, '']);
    }

    try {
      title2 = newsData[indexes[1][0]][indexes[1][1]][0]
    }
    catch (e) {
      console.log(e + " title 2" + indexes[1][0] + " " + indexes[1][1]);

    }
    try {
      date2 = newsData[indexes[1][0]][indexes[1][1]][1]
      console.log(date2)
    }
    catch (e) {
      console.log(e + " date2 " + indexes[1][0] + " " + indexes[1][1]);
    }
    try {
      source2 = newsData[indexes[1][0]][0]
    }
    catch (e) {
      console.log(e + " header2 " + indexes[1][0] + " " + indexes[1][1]);
    }

    if (title2 !== undefined && date2 !== undefined) {
      setTitle([title, title2]);
      // setSummary(summary);
      setDate([date1, date2]);
      setSource([source, source2]);
    }
  };

  if (newsData !== null)
    setInterval(changeNews, 1000 * 50);

  return (
    <div className='news-container'>
      <div className='titles'>
        <h2>Latest Headlines</h2>
        <i className="bi bi-newspaper"></i>
      </div>

      {(title.length === 0)?
        <>
          <div className='loading-place-holder'>
            <PlaceholderLoading shape="rect" width={150} height={15} />
            <PlaceholderLoading shape="rect" width={300} height={15} />
            <PlaceholderLoading shape="rect" width={300} height={15} />
            <PlaceholderLoading shape="rect" width={100} height={15} />
          </div>

          <div className='loading-place-holder'>
            <PlaceholderLoading shape="rect" width={150} height={15} />
            <PlaceholderLoading shape="rect" width={300} height={15} />
            <PlaceholderLoading shape="rect" width={300} height={15} />
            <PlaceholderLoading shape="rect" width={100} height={15} />
          </div>
        </>
        :
        <div className="headline-container">
          <div className='headline' ref={newsRef}>
            <h4>{source[0]}</h4>
            <h1>{title[0]}</h1>
            <div>
              <h3 style={{color: "rgb(102, 89, 223)"}}>{date[0]}</h3>
            </div>
          </ div>
          <div className='headline' ref={newsRef}>
            <h4>{source[1]}</h4>
            <h1>{title[1]}</h1>
            <div>
              <h3 style={{color: "rgb(102, 89, 223)"}}>{date[1]}</h3>
            </div>
          </ div>
        </div>
      }

      {/* <div className="headline-container">
        <div className='headline' ref={newsRef}>
          <h4>{source[0]}</h4>
          <h1>{title[0]}</h1>
          <div>
            <h3 style={{color: "rgb(102, 89, 223)"}}>{date[0]}</h3>
          </div>
        </ div>
        <div className='headline' ref={newsRef}>
          <h4>{source[1]}</h4>
          <h1>{title[1]}</h1>
          <div>
            <h3 style={{color: "rgb(102, 89, 223)"}}>{date[1]}</h3>
          </div>
        </ div>
      </div> */}
    </div>


  );
}


export default RssLinkHolder;
