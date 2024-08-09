import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';

function Register(){

    let [userId, setUserId] = useState("");
    let [userPw, setUserPw] = useState("");
    let [userPw2, setUserPw2] = useState("");
    let [userEmail, setUserEmail] = useState("");
    let [userNickname, setUserNickname] = useState("");

    let [dupIdErr, setDupIdErr] = useState(""); // 아이디 중복 오류 문구
    let [patIdErr, setPatIdErr] = useState(""); // 아이디 패턴 오류 문구
    let [patPwErr, setPatPwErr] = useState(""); // 비번 패턴 오류 문구
    let [samePwErr, setSamePwErr] = useState(""); // 비번 확인 오류 문구
    let [dupEmailErr, setDupEmailErr] = useState(""); // 이메일 중복 오류 문구
    let [patEmailErr, setPatEmailErr] = useState(""); // 이메일 패턴 오류 문구
    let [patNickErr, setPatNickErr] = useState(""); // 닉네임 패턴 오류 문구

    const navigate = useNavigate();

    const checkId = () => {
        setDupIdErr(false);
        setPatIdErr(false);
        // 아이디 패턴 체크 - 영어와 숫자로 조합된 5~20자리, 중복불가
        var regExp = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,20}$/
        if(regExp.test(userId) === true){
            setPatIdErr(false);
            checkDupIp(); // 아이디 중복체크
        } else {
            // 아이디 패턴 오류
            setPatIdErr(true);
        }
    }

    const checkDupIp = () => {
        setDupIdErr(false);
        // ID 중복체크
        const getDupId = async() => {
            let res = await axios.post('/user/dupId', {
                'user_id' : userId
            });
            return res.data;
        }

        let reply = getDupId();

        reply.then((data) => {
            if(data === 'success'){
                setDupIdErr(false);
            } else {
                setDupIdErr(true);
            }
        })
    }

    const checkPassword = () => {
        setPatPwErr(false);
        // 비밀번호 패턴 체크 - 8~16자의 영문, 숫자, 특수문자
        var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

        if(regExp.test(userPw) === true){
            setPatPwErr(false);
        } else {
            setPatPwErr(true);
        }
    }

    const checkPassword2 = () => {
        setSamePwErr(false);
        // 비밀번호 확인 체크
        if(userPw === userPw2){
            setSamePwErr(false);
        } else {
            setSamePwErr(true);
        }
    }

    const checkEmail = () => {
        setDupEmailErr(false);
        setPatEmailErr(false);
        // email패턴 체크
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if(regExp.test(userEmail) === true){
            setPatEmailErr(false);
            checkDupEmail(); // email 중복체크
        } else {
            setPatEmailErr(true);
        }
    }

    const checkDupEmail = () => {
        setDupEmailErr(false);
        // email 중복체크
        const getDupEmail = async() => {
            let res = await axios.post('/user/dupEmail', {
                'user_email' : userEmail
            });
            return res.data;
        }

        let response = getDupEmail();

        response.then((data) => {
            if(data === 'success'){
                setDupEmailErr(false);
            } else {
                setDupEmailErr(true);
            }
        })
    }

    const checkNickname = () => {
        setPatNickErr(false);
        if(userNickname.length > 6 || userNickname.length === 0){
            setPatNickErr(true);
        } else {
            setPatNickErr(false);
        }
    }

    function registerValidation(){

        checkId();
        checkEmail();
        checkPassword();
        checkPassword2();
        checkNickname();

        if(patIdErr === true || dupIdErr === true || patPwErr === true || samePwErr === true 
            || patEmailErr === true || dupEmailErr === true || patNickErr === true){
            return ;
        } else {
            registerB();
        }

    }

    function registerB(){
            
        const register = async() => {
            let res = await axios.post('/user/register', {
                'user_id' : userId,
                'user_pw' : userPw,
                'user_email' : userEmail,
                'user_nickname' : userNickname
            });
            return res;
        }

        let response = register();

        response.then((data) => {
            if(data.status === 200){
                alert('회원가입에 성공했습니다.');
                navigate('/login');
            } else {
                alert('회원가입에 실패했습니다.');
            }
        })
    }

    return(
        <div>
            <div className="wrapPage">
                <form className="loginForm">
                    <div>
                        <h1 id="budget_title">BUDGET BUDDY</h1>
                        <h2 id="budget_title2">회원가입</h2>
                    </div>
                    <div className="input">
                        <input type="text" className="userId" id="userId"
                            placeholder="아이디를 입력해주세요" autoFocus
                            onChange={(e) => setUserId(e.target.value)}
                            onBlur={() => checkId()}
                            ></input>
                        <div className={patIdErr ? 'err_msg_show' : 'err_msg'}>아이디는 영어 소문자와 숫자로 조합된 5~20자리로 설정해주세요.</div>
                        <div className={dupIdErr ? 'err_msg_show' : 'err_msg'}>중복된 아이디입니다.</div>
                        <input type="password" className="userPw" id="userPw"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={(e) => setUserPw(e.target.value)}
                            onBlur={() => checkPassword()}></input>
                        <div className={patPwErr ? 'err_msg_show' : 'err_msg'}>비밀번호는 영어와 숫자, 특수문자의 조합으로 8~16자리로 입력해주세요.</div>
                        <input type="password" className="userPw2" id="userPw2"
                            placeholder="비밀번호를 다시 한번 입력해주세요."
                            onChange={(e) => setUserPw2(e.target.value)}
                            onBlur={() => checkPassword2()}></input>
                        <div className={samePwErr ? 'err_msg_show' : 'err_msg'}>비밀번호가 일치하지 않습니다.</div>
                        <input type="text" className="userEmail" id="userEmail"
                            placeholder="이메일를 입력해주세요"
                            onChange={(e) => setUserEmail(e.target.value)}
                            onBlur={() => checkEmail()}></input>
                        <div className={patEmailErr ? 'err_msg_show' : 'err_msg'}>이메일 형식을 확인해주세요.</div>
                        <div className={dupEmailErr ? 'err_msg_show' : 'err_msg'}>중복된 이메일입니다.</div>
                        <input type="text" className="userNickname" id="userNickname"
                            placeholder="닉네임을 입력해주세요"
                            onChange={(e) => setUserNickname(e.target.value)}
                            onBlur={() => checkNickname()}></input>
                        <div className={patNickErr ? 'err_msg_show' : 'err_msg'}>닉네임은 최대 6글자까지 가능합니다.</div>
                        <button type="button" id="loginBtn"
                            onClick={() => {registerValidation({user_id : userId, user_pw : userPw,
                                                        user_email : userEmail,
                                                        user_nickname : userNickname})}}
                            >회원가입</button>
                    </div>
                    <div className="link">
                        <Link to="/login">로그인</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;