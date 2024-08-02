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
      path='/room'

    />
    <Route 
    element={<Chat/>
    }
    path='/'
    />
 </Routes>
   </BrowserRouter>
  );
}

export default App;
