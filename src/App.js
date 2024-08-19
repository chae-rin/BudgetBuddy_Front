/** eslint-disable */
import React, {useState, useEffect} from 'react';
import { Routes, Route, useLocation, NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Home from "./pages/Home";
import Budget from "./pages/Budget.js";
import Login from './login/Login';
import Register from './login/Register';
import FindId from './login/FindId';
import FindPw from './login/FindPw';
import ResetPw from './login/ResetPw';
import LoginErr from './login/LoginErr';
import MyInfo from './pages/MyInfo';
import PrivateRoute from './component/routes/PrivateRoute';
import PublicRoute from './component/routes/PublicRoute';
import Authentication from './login/authentication/AuthenticationService';
import './App.css';
import { styled } from '@mui/material';

function App() {

  let today = new Date();
  const navigate = useNavigate();
  const isLogin = Authentication.isUserLoggedIn();
  let [userNickname, setUserNickname] = useState("");

  useEffect(() => {

    if(isLogin){
      axios.post('/user/findById', {
        'user_id' : Authentication.getLoginUserId()
      }).then((res) => {
        setUserNickname(res.data.user_nickname);
      }).catch(function(err){
        console.log('error : ' + err);
      });
    }

  });

  function logout(){
    if(window.confirm('로그아웃하시겠습니까?')){
      Authentication.logout();
      navigate('/');
    }
  }

  return (
    <div className="App">
      <div className="AuthApp">
        <div className="black-nav">
            <div className="bank-logo"></div>
            <div className='main-title'>Budget Buddy</div>
            {
              isLogin
              ? 
                <div className="logoutContainer">
                  <div className="nickname" onClick={() => navigate('/myInfo')}>{userNickname}님</div>
                  <button type="button" className='logout' onClick={() => {logout()}}>로그아웃</button>
                </div>
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
        {/* 404 페이지 */}
        <Route path={"*"} element={<LoginErr/>}/>

        {/* 로그인전용 */}
        <Route element={<PrivateRoute/>}>
          <Route path="/budget/:year/:month" element={<Budget/>}></Route>
          <Route path="/myInfo" element={<MyInfo/>}></Route>
        </Route>

        {/* 로그아웃 전용 */}
        <Route element={<PublicRoute/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/findId' element={<FindId/>}/>
          <Route path='/findPw' element={<FindPw/>}/>
          <Route path='/resetPw' element={<ResetPw/>}/>
        </Route>

        {/* 로그인, 로그아웃 공통 */}
        <Route path="/" element={<Home/>}/>
        <Route path='/loginErr' element={<LoginErr/>}/>
      </Routes>
    </div>
  );
}

export default App;