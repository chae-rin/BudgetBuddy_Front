/** eslint-disable */
import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from "./pages/Home";
import Budget from "./pages/Budget.js";

import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {

  // axios.post('/test/')
  //      .then(function(response){
  //         //console.log(response);
  //      })
  //      .catch(function(error){
  //         //console.log(error);
  //      });
  
  const [isActive, setIsActive] = useState(false);

  function handleClick(){
    console.log("hi");
    setIsActive(!isActive);
  }

  return (
    <div className="App">
      <div className="black-nav">
          <div>챌인's TMI 저장소</div>
      </div>
      <nav className='topMenu'>
        <ul>
          <li><Link to="/" className="menuLink active">Home</Link></li>
          <li><Link to="/budget" className="menuLink" >가계부</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/budget" element={<Budget/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
