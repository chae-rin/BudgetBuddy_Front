import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';

function FindId(){

    let [userEmail, setUserEmail] = useState("");
    let [isVisible, setIsVisible] = useState(""); // 이메일 없을 시 메세지
    let [patEmailErr, setPatEmailErr] = useState(""); // 이메일 패턴 오류 문구

    const checkEmail = () => {
        setIsVisible(false);
        setPatEmailErr(false);
        // email패턴 체크
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        
        if(regExp.test(userEmail) === true){
            setPatEmailErr(false);
        } else {
            setPatEmailErr(true);
        }
    }

    function findId(props){

        if(isVisible === true || patEmailErr === true){
            checkEmail();
            return;
        } else {
            axios.post('/user/findId',{
                'user_email' : props.userEmail,
            }).then((res) => {
                if(res.data === "NULL"){
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                    alert('고객님의 아이디는 "' + res.data + '" 입니다.');
                }
            }).catch(function(err){
                console.log('err : ' + err);
            });
        }

    }

    return(
        <div>
            <div className="wrapPage">
                <form className="loginForm">
                    <div>
                        <h1 id="budget_title">BUDGET BUDDY</h1>
                        <h2 id="budget_title2">아이디 찾기</h2>
                    </div>
                    <div className="input">
                        <input type="text" className="userEmail" id="userEmail"
                                placeholder="이메일을 입력해주세요" autoFocus
                                onChange={(e) => setUserEmail(e.target.value)}
                                onBlur={() => checkEmail()}></input>
                        <div className={isVisible ? 'err_msg_show' : 'err_msg'}>해당되는 이메일이 없습니다.</div>
                        <div className={patEmailErr ? 'err_msg_show' : 'err_msg'}>이메일 형식을 확인해주세요.</div>
                        <button type="button" id="loginBtn"
                            onClick={() => {findId({userEmail : userEmail})}}
                            >아이디 찾기</button>
                    </div>
                    <div className="link">
                        <Link to="/login">로그인</Link>
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

export default FindId;