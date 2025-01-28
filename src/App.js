import React from 'react';
import Counter from './components/Counter';
import Navigator from './components/navigator/Navigator';
import { Route, Routes } from 'react-router';
import Home from './components/home/Home.js';
import Services from './components/services/Services.js';
import Footer from './components/common/Footer.js';

function App() {
  return (
    <div className="app">
      <Navigator sticky="top"></Navigator>
      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='' element={<Home></Home>}></Route>
        <Route path='services' element={<Services />}></Route>
      </Routes>
      <Footer sticky='bottom'> </Footer>
    </div>
  );
}

export default App;
