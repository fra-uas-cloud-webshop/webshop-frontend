
import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Alert, Modal, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("credit_card");
    const [showModal, setShowModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // Calculate total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Handle input change
    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    // Handle payment method change
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    // Validate input fields before proceeding
    const validateCheckout = () => {
        if (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.address) {
            setPaymentStatus("Please fill in all fields before proceeding.");
            return false;
        }
        return true;
    };

    // Simulate Payment Processing
    const processPayment = async () => {
        setPaymentStatus("Processing payment...");
    
        const orderData = {
            
                customerName: userInfo.name,
                customerEmail: userInfo.email,
                phoneNumber: userInfo.phone,
                shippingAddress: userInfo.address,
                totalAmount: getTotalPrice(), // Total order amount
                status: "PENDING", // Default order status
                paymentMethod: paymentMethod, // Selected payment method
            items:cart.map(item => ({
                // id: item.id,
                productName: item.name,
                productPrice:item.price,
                quantity: item.quantity,
                totalPriceForItem: item.price*item.quantity
            })),
            
           
           
        };
    
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });
            
            if (response.ok) {
                setPaymentStatus("Payment Successful! Redirecting...");
                localStorage.removeItem("cart"); // Clear cart after successful payment
                setTimeout(() => navigate("/order-confirmation"), 3000);
            } else {
                setPaymentStatus("Failed to process the order. Try again.");
            }
        } catch (error) {
            setPaymentStatus("Error connecting to server.");
        }
    };
    
    return (
        <Container className="mt-4">
            <h2 className="text-center">Checkout</h2>

            {paymentStatus && <Alert variant="info" className="text-center">{paymentStatus}</Alert>}

            <Row className="g-4">
                {/* Billing Info */}
                <Col md={6}>
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
                </Col>

                {/* Order Summary */}
                <Col md={6}>
                    <h4>Order Summary</h4>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h4 className="text-end">Total: ${getTotalPrice()}</h4>
                </Col>
            </Row>

            {/* Payment Methods */}
            <h4>Select Payment Method</h4>
            <Row className="g-3">
                <Col xs={6} md={3}>
                    <Form.Check 
                        type="radio" 
                        label={<Image src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" width="50" />}
                        name="paymentMethod" 
                        value="credit_card"
                        checked={paymentMethod === "credit_card"}
                        onChange={handlePaymentChange} 
                    />
                </Col>
                <Col xs={6} md={3}>
                    <Form.Check 
                        type="radio" 
                        label={<Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="50" />}
                        name="paymentMethod" 
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={handlePaymentChange} 
                    />
                </Col>
                <Col xs={6} md={3}>
                    <Form.Check 
                        type="radio" 
                        label={<Image src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Google_Pay_Acceptance_Mark.svg" width="50" />}
                        name="paymentMethod" 
                        value="google_pay"
                        checked={paymentMethod === "google_pay"}
                        onChange={handlePaymentChange} 
                    />
                </Col>
                <Col xs={6} md={3}>
                    <Form.Check 
                        type="radio" 
                        label="Cash on Delivery"
                        name="paymentMethod" 
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={handlePaymentChange} 
                    />
                </Col>
            </Row>

            <div className="text-center mt-4">
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
            </div>

            {/* Payment Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Complete Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {paymentMethod === "credit_card" && (
                        <>
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
                        </>
                    )}
                    {paymentMethod === "paypal" && <p>You will be redirected to PayPal.</p>}
                    {paymentMethod === "google_pay" && <p>You will be redirected to Google Pay.</p>}
                    {paymentMethod === "cod" && <p>COD selected. Pay when you receive your order.</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="success" onClick={processPayment}>Confirm Payment</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CheckoutPage;
