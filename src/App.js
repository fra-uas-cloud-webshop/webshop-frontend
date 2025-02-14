import React from 'react';
import { Route, Routes } from 'react-router';
import Navigator from './components/navigator/Navigator';
import Home from './components/home/Home';
import Services from './components/services/Services';
import Footer from './components/common/Footer';
import ServiceDetails from './components/services/ServiceDetails';
import Inventory from './components/inventory/Inventory';
import CartPage from './components/common/CartPage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigator sticky="top" />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="services/details/:id" element={<ServiceDetails />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
