import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';

function ResetPw(){

    const navigate = useNavigate();
    const location = useLocation();

    let [userPw, setUserPw] = useState("");
    let [userPw2, setUserPw2] = useState("");
    let [patPwErr, setPatPwErr] = useState(""); // 비번 패턴 오류 문구
    let [samePwErr, setSamePwErr] = useState(""); // 비번 확인 오류 문구

    const checkPassword = () => {
        setPatPwErr(false);
        // 비밀번호 패턴 체크 - 8~16자의 영문, 숫자, 특수문자
        var regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

        if(regExp.test(userPw) === true){
            setPatPwErr(false);
        } else {
            setPatPwErr(true);
        }

        if(userPw === userPw2){
            setSamePwErr(false);
        } else {
            setSamePwErr(true);
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

    function resetPw(){
        if(setSamePwErr === true || setPatPwErr === true){
            return ;
        } else {
            axios.post('/user/resetPw',{
                'user_id' : location.state.user_id,
                'user_pw' : userPw
            }).then((res) => {
                if(res.status === 200){
                    alert('비밀번호 변경이 완료되었습니다.');
                    navigate('/login');
                } else {
                    alert('비밀번호 변경이 실패되었습니다.');
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
                        <h2 id="budget_title2">비밀번호 초기화</h2>
                    </div>
                    <div className="input">
                        <input type="password" className="userPw" id="userPw"
                                placeholder="변경할 비밀번호를 입력해주세요" autoFocus
                                onChange={(e) => setUserPw(e.target.value)}
                                onBlur={() => checkPassword()}></input>
                        <div className={patPwErr ? 'err_msg_show' : 'err_msg'}>비밀번호는 영어와 숫자, 특수문자의 조합으로 8~16자리로 입력해주세요.</div>
                        <input type="password" className="userPw2" id="userPw2"
                                placeholder="비밀번호를 다시 한번 입력해주세요."
                                onChange={(e) => setUserPw2(e.target.value)}
                                onBlur={() => checkPassword2()}></input>
                        <div className={samePwErr ? 'err_msg_show' : 'err_msg'}>비밀번호가 일치하지 않습니다.</div>
                        <button type="button" id="loginBtn"
                            onClick={() => {resetPw({userPw : userPw, userPw2 : userPw2})}}
                            >비밀번호 초기화</button>
                    </div>
                    <div className="link">
                        <Link to="/login">로그인</Link>
                        <span>&nbsp; | &nbsp;</span>
                        <Link to="/findId">아이디 찾기</Link>
                        <span>&nbsp; | &nbsp;</span>
                        <Link to="/register">회원가입</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPw;