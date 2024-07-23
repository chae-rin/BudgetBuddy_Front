/** eslint-disable */
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {

  let [title, updateTitle] = useState(['20대 여성 코트 추천', '강남 우동 맛집']);

  axios.post('/test/')
       .then(function(response){
          console.log(response);
       })
       .catch(function(error){
          console.log(error);
       });

  return (
    <div className="App">
      <div className="black-nav">
        <div>챌인's TMI 저장소</div>
      </div>
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
  );
}

export default App;
