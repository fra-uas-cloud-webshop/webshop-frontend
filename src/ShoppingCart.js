import React, { useState } from "react";
import "./ShoppingCart.css";
import "./responsive.css";

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
    <div className="shopping-cart">
      <header className="header">
        <div className="company-name">LowTech</div>
        <div className="user-menu">
          <button className="user-button">Emin Guliyev</button>
          <div className="dropdown">
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </header>

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} - ${item.price.toFixed(2)}</span>
            <div className="buttons">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              <button className="remove" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
        <div className="summary">Total: ${total}</div>
        <div className="actions">
          <button className="back">Back</button>
          <button className="proceed">Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
