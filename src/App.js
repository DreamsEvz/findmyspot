import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/templates/Home/Home';
import Log from './components/templates/Log/Log';


function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/test" element={<Home/>} />
      </Routes> */}
      <Home/>
    </div>
  );
}

export default App;
