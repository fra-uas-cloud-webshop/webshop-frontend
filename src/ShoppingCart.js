import React, { useState } from "react";
import "./ShoppingCart.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Compute Engine", price: 24.99, quantity: 1 },
    { id: 2, name: "Cloud Storage", price: 9.99, quantity: 1 },
  ]);

  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center py-3 border-bottom">
        <div className="h4">LowTech</div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Emin Guliyev
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
      </header>

      <div className="card p-4 mt-4">
        <h2 className="mb-3">Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
            <span>{item.name} - ${item.price.toFixed(2)}</span>
            <div>
              <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span className="mx-2">{item.quantity}</span>
              <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => updateQuantity(item.id, 1)}>+</button>
              <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
        <div className="mt-3 fw-bold">Total: ${total}</div>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-primary">Back</button>
          <button className="btn btn-success">Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
