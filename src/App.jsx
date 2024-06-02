import React from 'react';
import Login from './componets/Login.jsx';
import Signup from './componets/Signup.jsx';
import Home from './componets/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MyContext } from './utilitiz/Contexapi.js';
import { useState } from 'react';
function App() {
  const [change,setchange] = useState(false);
  return (
    
    <MyContext.Provider value={{change,setchange}}>
    <div className=' h-screen'>
      <BrowserRouter>

      <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
   
     
     </Routes>
     </BrowserRouter>
     <Toaster/>
    </div>
    </MyContext.Provider>
  );
}

export default App;
