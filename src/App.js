/** eslint-disable */
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Register from './login/Register';
import FindId from './login/FindId';
import FindPw from './login/FindPw';
import ResetPw from './login/ResetPw';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/findId' element={<FindId/>}/>
          <Route path='/findPw' element={<FindPw/>}/>
          <Route path='/resetPw' element={<ResetPw/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;