/** eslint-disable */
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, NavLink} from 'react-router-dom';
import Home from "./pages/Home";
import Budget from "./pages/Budget.js";
import Login from './login/Login';
import Register from './login/Register';
import FindId from './login/FindId';
import FindPw from './login/FindPw';
import ResetPw from './login/ResetPw';
import './App.css';
import { styled } from '@mui/material';

function App() {

  let today = new Date();

  return (
    <div className="App">
      <div className="black-nav">
          <div className="bank-logo"></div>   
          <div>Budget Buddy</div>
      </div>
      <nav className='topMenu'>
        <ul>
          <li><NavLink to="/" className="menuLink">Home</NavLink></li>
          <li><NavLink to={`/budget/${today.getFullYear()}/${today.getMonth()+1}`} className="menuLink">가계부</NavLink></li>

          {/* <li><Link to="/" className="menuLink">Home</Link></li>
          <li><Link to={`/budget/${today.getFullYear()}/${today.getMonth()+1}`} className="menuLink">가계부</Link></li>
          <li><Link to="/login" className="menuLink" >로그인</Link></li> */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/budget/:year/:month" element={<Budget/>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/findId' element={<FindId/>}/>
        <Route path='/findPw' element={<FindPw/>}/>
        <Route path='/resetPw' element={<ResetPw/>}/>
      </Routes>
    </div>
  );
}

export default App;