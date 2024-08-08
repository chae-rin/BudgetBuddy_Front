/** eslint-disable */
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';
import { decrypted } from './Crypto';

function Login(){

    let [userId, setUserId] = useState("");
    let [userPw, setUserPw] = useState("");
    let [isVisible, setIsVisible] = useState("");

    let [decryptedPW, setDecryptedPW] = useState("");
    
    const navigate = useNavigate();

    function getPassword() {
        const getPW = async() => {
            let res = await axios.post('/user/loginPassword', {
                'user_id' : userId
            });
            return res.data;
        }
        let response = getPW();
        response.then((data) => {
            if(data === '') {
            } else {
                setDecryptedPW(decrypted(data));
            }
        })
    }

    function getLogin(){
        if(userPw === decryptedPW) {            
            setIsVisible(false);
            navigate('/register'); // 홈화면으로 보내기
        } else {
            setIsVisible(true);
        }

        /*
        const getRes = async() => {
            let res = await axios.post('/user/login', {
                'user_id' : userId,
                'user_pw' : userPw,
            });

            return res.data;
        }

        let response = getRes();

        response.then((data) => {
            if(data === 'success'){
                setIsVisible(false);
                navigate('/register'); // 홈화면으로 보내기
            } else {
                setIsVisible(true);
            }
        })
        */   
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
                            onBlur={() => getPassword()}></input>
                        <input type="password" className="userPw" id="userPw"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={(e) => setUserPw(e.target.value)}></input>
                        <div className={isVisible ? 'err_msg_show' : 'err_msg'}>아이디와 비밀번호를 확인해주세요.</div>
                        <button type="button" id="loginBtn"
                            onClick={() => {getLogin({userId : userId, userPw : userPw})}}
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