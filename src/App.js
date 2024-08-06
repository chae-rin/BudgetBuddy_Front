/** eslint-disable */
import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from "./pages/Home";
import Budget from "./pages/Budget.js";
import './App.css';

function App() {

  let today = new Date();

  return (
    <div className="App">
      <div className="black-nav">
          <div>챌인's TMI 저장소</div>
      </div>
      <nav className='topMenu'>
        <ul>
          <li><Link to="/" className="menuLink active">Home</Link></li>
          <li><Link to={`/budget/${today.getFullYear()}/${today.getMonth()+1}`} className="menuLink" >가계부</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/budget/:year/:month" element={<Budget/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
