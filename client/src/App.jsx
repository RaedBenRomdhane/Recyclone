import React, { useState } from 'react';
import {Route ,Routes,Link} from 'react-router-dom'

import Nav from './Nav.jsx'
import Home from './pages/Home.jsx';
import User from './pages/User.jsx';
import Admin from './pages/Admin.jsx';


function App() {
  return (<>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/user" element={<User />}/>
      <Route path="/admin" element={<Admin />}/>
    </Routes>
  </>);
}

export default App;
