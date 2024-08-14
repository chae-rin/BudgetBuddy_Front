/** eslint-disable */
import React from 'react';
import { Link } from "react-router-dom";
import '../css/Login.css';
import '../axios/axios.js';

function LoginErr(){
    return(
        <div>
            <div className="wrapPage">
                <form className="loginForm">
                    <div>
                        <h1 id="budget_title">BUDGET BUDDY</h1>
                        <h2 id="budget_title2">로그인 후 이용해주세요.</h2>
                    </div>
                    <div className="link">
                        <Link to="/login">▶LOGIN</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginErr;