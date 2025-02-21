import React from 'react';
import { Route, Routes } from 'react-router';
import Navigator from './components/navigator/Navigator';
import Home from './components/home/Home';
import Services from './components/services/Services';
import Footer from './components/common/Footer';
import ServiceDetails from './components/services/ServiceDetails';
import Inventory from './components/inventory/Inventory';
import CartPage from './components/common/CartPage';
import MyOrders from './components/orders/MyOrders';
import OrderManagement from './components/orders/OrderManagement';
import CheckoutPage from './components/common/CheckoutPage';
import OrderConfirmation from './components/orders/OrderConfirmation';
import CreateProduct from './components/products/CreateProduct';

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
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/orderManagement" element={<OrderManagement />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
