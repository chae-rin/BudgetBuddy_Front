import React, {useState} from "react";

function Home(){

    let [title, updateTitle] = useState(['20대 여성 코트 추천', '강남 우동 맛집']);

    return (
        <div>
            <div className="list">
                <h3> {title[0]} </h3>
                <p>2월 17일 발행</p>
                <hr/>
            </div>
            <div className="list">
                <h3> {title[1]} </h3>
                <p>2월 18일 발행</p>
                <hr/>
            </div>
        </div>
    )
}

export default Home;