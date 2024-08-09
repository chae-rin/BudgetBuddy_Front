/** eslint-disable */
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import '../axios/axios.js';
import Authentication from '../login/authentication/AuthenticationService.js'

function Login(){

    let [userId, setUserId] = useState("");
    let [userPw, setUserPw] = useState("");
    let [isVisible, setIsVisible] = useState("");
    
    const navigate = useNavigate();

    let today = new Date();
    const yearMon = `${today.getFullYear()}/${today.getMonth()+1}`;

    function authLogin(){
        setIsVisible(false);
        Authentication.executeJwtAuthenticationService(userId, userPw)
            .then((response)=>{
                Authentication.registerSuccessLoginForJwt(userId, response.data.token);
                alert("로그인에 성공하였습니다.");
                navigate('/budget/'+yearMon);
            }).catch((err)=>{
                setIsVisible(true);
            });
    }

    return(
        <div>
            <div className="wrapPage">
                <form className="loginForm">
                    <div>
                        <h1 id="budget_title">BUDGET BUDDY</h1>
                        <h2 id="budget_title2">로그인</h2>
                    </div>
                    <div className="input">
                        <input type="text" className="userId" id="userId"
                            placeholder="아이디를 입력해주세요" autoFocus
                            onChange={(e) => setUserId(e.target.value)}
                            ></input>
                        <input type="password" className="userPw" id="userPw"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={(e) => setUserPw(e.target.value)}></input>
                        <div className={isVisible ? 'err_msg_show' : 'err_msg'}>아이디와 비밀번호를 확인해주세요.</div>
                        <button type="button" id="loginBtn"
                            onClick={() => {authLogin()}}
                            >Login</button>
                    </div>

                    <div className="link">
                        <Link to="/findId">ID 찾기</Link>
                        <span>&nbsp; | &nbsp;</span>
                        <Link to="/findPw">비밀번호 찾기</Link>
                        <span>&nbsp; | &nbsp;</span>
                        <Link to="/register">회원가입</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;