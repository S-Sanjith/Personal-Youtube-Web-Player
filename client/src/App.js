import React, { useState } from 'react';
import './App.css';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";

function App() {
  return (
    <div className='app'>
      <SearchBar />
    </div>
  )
}

function SearchBar() {
  return (
  <div className='search'>
      <h2>Search video...</h2>
      <TextField
        fullWidth
        label="Search"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
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