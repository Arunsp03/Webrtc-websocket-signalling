import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from './Components/Chat';
import Room from './Components/Room';


function App() {
  return (
    
    <BrowserRouter>
    <Routes >
    <Route
      element={<Room />}
      path='/'

    />
    <Route 
    element={<Chat/>
    }
    path='/chat'
    />
 </Routes>
   </BrowserRouter>
  );
}

export default App;
