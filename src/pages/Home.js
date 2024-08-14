import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import Authentication from '../login/authentication/AuthenticationService';

function Home(){

    const isLogin = Authentication.isUserLoggedIn();

    return(
        <div>
            <div className="wrapPage">
                <form className="loginForm">
                    <div>
                        <h1 id="budget_title">BUDGET BUDDY</h1>
                    </div>
                    <div className="budget-logo"> </div>
                    {
                        isLogin
                        ? <></> 
                        :
                        <div className="link">
                            <Link to="/login">로그인</Link>
                            <span>&nbsp; | &nbsp;</span>
                            <Link to="findId">아이디 찾기</Link>
                            <span>&nbsp; | &nbsp;</span>
                            <Link to="/findPw">비밀번호 찾기</Link>
                            <span>&nbsp; | &nbsp;</span>
                            <Link to="/register">회원가입</Link>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default Home;