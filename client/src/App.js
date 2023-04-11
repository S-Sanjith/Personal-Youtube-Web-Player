import React, { useState, useEffect } from 'react';
import './App.css';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import axios from "axios"


/*function searchByKeyword() {
  var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 5});
  for(var i in results.items) {
    var item = results.items[i];
    //Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    console.log(item.snippet.title)
  }
}*/

function App() {
  
  const [playlist,setPlaylist]= useState([])
  const [mainVid, setMainVid] = useState({})
  const [topic, setTopic] = useState('react')

  useEffect(() => {
    // replace this string with the actual key 
    let KEY = 'enter-your-key-here'
    
    axios
      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${KEY}&q=${topic}`)
      .then(response => {
        console.log(response.data.items)
        setPlaylist(response.data.items)
        setMainVid(response.data.items[0])
      })
      .catch(error => {
        console.log(error);
      })
    }, [topic])

    console.log(playlist)

    
  return (
    <div className='app'>
      <SearchBar setTopic={setTopic} topic={topic} />
      <div className='rowDiv'>
        <iframe className='mainVideo' src={"https://www.youtube.com/embed/"+mainVid?.id?.videoId} title="Linux Operating System - Crash Course for Beginners" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div className="relatedVideos">
          {playlist.map(el => (
            <div>
              <img className='col' onClick={
                (event) => setMainVid(el)
              } src={"http://img.youtube.com/vi/"+el?.id?.videoId+"/mqdefault.jpg"} alt="video"></img>
              <p>{el?.snippet?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SearchBar({setTopic}, {topic}) {
  const [inputField, setInputField] = useState('')

  return (
    <div className='search'>
        <h2>Search video...</h2>
        <TextField
          fullWidth
          label="Search"
          value={topic}
          onChange={e => setInputField(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={e => setTopic(inputField)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
    </div>
  )
}

export default App
