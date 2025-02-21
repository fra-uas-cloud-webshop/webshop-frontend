import React, { useState, useEffect } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const CartPage = () => {
    // ✅ Load cart from localStorage when component mounts
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // ✅ Ensure localStorage is updated whenever cart changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    // ✅ Prevent accidental empty cart writes
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart && cart.length === 0) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    const navigate=useNavigate();
    const handleCheckout=()=>{
        navigate('/checkout')
    }

    // Increase quantity
    const increaseQuantity = (id) => {
        setCart(cart.map(item => 
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // Decrease quantity (prevent going below 1)
    const decreaseQuantity = (id) => {
        setCart(cart.map(item => 
            item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    // Remove item
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item._id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Calculate total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.perUnitPrice * item.quantity, 0).toFixed(2);
    };

    return (
        <Container className="mt-4">
            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
                <Alert variant="warning">Your cart is empty!</Alert>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>${item.perUnitPrice}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" onClick={() => decreaseQuantity(item._id)}>-</Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button variant="outline-primary" size="sm" onClick={() => increaseQuantity(item._id)}>+</Button>
                                    </td>
                                    <td>${(item.perUnitPrice * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => removeFromCart(item._id)}>Remove</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h4>Total: ${getTotalPrice()}</h4>
                    <Button variant="success" onClick={handleCheckout}>
                        Proceed to Checkout
                    </Button>
                </>
            )}
        </Container>
    );
};

export default CartPage;
