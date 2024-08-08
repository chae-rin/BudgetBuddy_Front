import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../css/Login.css';
import axios from 'axios';

function FindPw(){

    let [userId, setUserId] = useState("");
    let [userEmail, setUserEmail] = useState("");
    let [isVisible, setIsVisible] = useState("");
    const navigate = useNavigate();

    function findPw(props){

        axios.post('/user/findPw',{
            'user_id' : props.userId,
            'user_email' : props.userEmail
        }).then((res) => {
            if(res.data === "success"){
                setIsVisible(false);
                navigate('/ResetPw', {state : {user_id : props.userId}});
            } else {
                setIsVisible(true);
            }
        }).catch(function(err){
            console.log('err : ' + err);
        });

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
                        <input type="text" className="userId" id="userId"
                                placeholder="아이디를 입력해주세요" autoFocus
                                onChange={(e) => setUserId(e.target.value)}></input>
                        <input type="text" className="userEmail" id="userEmail"
                                placeholder="이메일을 입력해주세요"
                                onChange={(e) => setUserEmail(e.target.value)}
                                ></input>
                        <div className={isVisible ? 'err_msg_show' : 'err_msg'}>해당되는 정보가 없습니다.</div>
                        {/* <div className={isVisible ? 'err_msg_show' : 'err_msg'}>아이디와 이메일이 일치하지 않습니다.</div> */}
                        <button type="button" id="loginBtn"
                            onClick={() => {findPw({userId : userId, userEmail : userEmail})}}
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

export default FindPw;