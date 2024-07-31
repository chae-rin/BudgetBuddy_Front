import { Component } from 'react';
import React, {useState} from "react";
import '../css/your.style.css';

import Total from '../component/budget/Header.js';
import Main from '../component/budget/Main.js';

function Budget(){
   
    // 날짜 세팅
    const [curDate, setCurDate] = useState(new Date());
        
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    };
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    };

    return (
        <div className="Budget">
            <div className='Header'>
                <div className="montlyContent">
                    <button className="arrow-btn" onClick={decreaseMonth}>◀</button>
                    <div style={{display:'inline-block'}}>
                        <p>{curDate.getFullYear()}년 자산현황</p>
                        <span>{curDate.getMonth()+1}</span><span>월</span>
                    </div>
                    <button className="arrow-btn" onClick={increaseMonth}>▶</button>             
                </div>
                <Total curDate={curDate}></Total>
            </div>
            <Main curDate={curDate}></Main>            
        </div>
    )
}

export default Budget;