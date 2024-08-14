/** eslint-disable */
import React, {useState} from 'react';
import { Routes, Route, Link, useLocation, NavLink} from 'react-router-dom';
import Home from "./pages/Home";
import Budget from "./pages/Budget.js";
import Login from './login/Login';
import Register from './login/Register';
import FindId from './login/FindId';
import FindPw from './login/FindPw';
import ResetPw from './login/ResetPw';
import LoginErr from './login/LoginErr';
import PrivateRoute from './PrivateRoute';
import Authentication from './login/authentication/AuthenticationService';
import './App.css';
import { styled } from '@mui/material';

function App() {

  let today = new Date();

  const isLogin = Authentication.isUserLoggedIn();

  return (
    <div className="App">
      <div className="AuthApp">
        <div className="black-nav">
            <div className="bank-logo"></div>
            <div className='main-title'>Budget Buddy</div>
            {
              isLogin
              ? <div className='logout'>로그아웃</div>
              : <></>
            }
        </div>
        {
          isLogin
          ?
          <nav className='topMenu'>
            <ul>
              <li><NavLink to="/" className="menuLink">Home</NavLink></li>
              <li><NavLink to={`/budget/${today.getFullYear()}/${today.getMonth()+1}`} className="menuLink">가계부</NavLink></li>
            </ul>
          </nav>
          :
          <></>
        }
      </div>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/budget/:year/:month" element={<Budget/>}></Route>
        </Route>
        <Route path="/" element={<LoginErr/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/findId' element={<FindId/>}/>
        <Route path='/findPw' element={<FindPw/>}/>
        <Route path='/resetPw' element={<ResetPw/>}/>
        <Route path='/loginErr' element={<LoginErr/>}/>
      </Routes>
    </div>
  );
}

export default App;