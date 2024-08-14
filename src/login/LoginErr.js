/** eslint-disable */
import React from 'react';
import { Link } from "react-router-dom";
import '../css/Login.css';
import '../axios/axios.js';
import Authentication from './authentication/AuthenticationService';

function LoginErr(){

    const isLogin = Authentication.isUserLoggedIn();

    return(
        <div>
            <div className="wrapPage">
                <form className="loginForm">
                    <div>
                        <h1 id="budget_title">BUDGET BUDDY</h1>
                        {
                            isLogin
                            ? <h2 id="budget_title2">잘못된 페이지입니다.</h2>
                            : <h2 id="budget_title2">로그인 후 이용해주세요.</h2>
                        }
                    </div>
                    <div className="link">
                        {
                            isLogin
                            ? <Link to="/">▶Home</Link>
                            : <Link to="/login">▶LOGIN</Link>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginErr;