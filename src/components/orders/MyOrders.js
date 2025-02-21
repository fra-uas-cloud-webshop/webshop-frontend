import React, { useState } from "react";
import { Button, Form, Alert, Table } from "react-bootstrap";

const MyOrders = () => {
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/api/orders/by-email?email=${email}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch orders. Please try again.");
            }

            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>My Orders</h2>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Please enter your Email address to see your orders</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </Button>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {orders.length > 0 && (
                <div className="mt-4">
                    <h3>Your Orders</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.id}</td>
                                    <td>${order.totalAmount.toFixed(2)}</td>
                                    <td>{order.status}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
