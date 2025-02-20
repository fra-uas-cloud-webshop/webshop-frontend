import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // Calculate total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.perUnitPrice * item.quantity, 0).toFixed(2);
    };

    // Handle input change
    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    // Validate input fields before proceeding
    const validateCheckout = () => {
        if (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.address) {
            setPaymentStatus("Please fill in all fields before proceeding.");
            return false;
        }
        return true;
    };

    return (
        <Container className="mt-4">
            <h2>Checkout</h2>

            {paymentStatus && <Alert variant="danger">{paymentStatus}</Alert>}

            <h4>Billing Information</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={userInfo.name} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={userInfo.email} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phone" value={userInfo.phone} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={userInfo.address} onChange={handleInputChange} required />
                </Form.Group>
            </Form>

            <h4>Order Summary</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>${item.perUnitPrice}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.perUnitPrice * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h4>Total Amount: ${getTotalPrice()}</h4>

            <Button
                variant="primary"
                onClick={() => {
                    if (validateCheckout()) {
                        setShowModal(true);
                    }
                }}
            >
                Proceed to Payment
            </Button>

            {/* Payment Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please enter your payment information (Demo Only)</p>
                    <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control type="text" placeholder="1234 5678 9012 3456" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control type="text" placeholder="MM/YY" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" placeholder="123" required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            setPaymentStatus("Payment Successful! Redirecting...");
                            setTimeout(() => {
                                localStorage.removeItem("cart");
                                navigate("/order-confirmation");
                            }, 3000);
                        }}
                    >
                        Pay Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CheckoutPage;
