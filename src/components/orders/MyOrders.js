import React, { useState } from "react";
import { Button, Form, Alert, Table, Spinner } from "react-bootstrap";
import config from "../../config";

const MyOrders = () => {
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [canceling, setCanceling] = useState(null); // Track which order is being canceled

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/orders/by-email?email=${email}`);
            
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

    const cancelOrder = async (orderId) => {
        if (!orderId) {
            setError("Order ID not found!");
            return;
        }

        setCanceling(orderId); // Disable button while canceling

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/orders/cancel?orderId=${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to cancel order. Please try again.");
            }

            const updatedOrder = await response.json();

            // Update orders list and mark as "CANCELLED"
            setOrders(orders.map(order => 
                order.items[0]?.orderId === orderId ? { ...order, status: "CANCELLED" } : order
            ));

            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setCanceling(null);
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
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Submit"}
                </Button>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {orders.length > 0 && (
                <div className="mt-4">
                    <h3>Your Orders</h3>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Payment Method</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                const orderId = order.items[0]?.orderId; // Ensure we are using items[0].orderId
                                return (
                                    <tr key={orderId}>
                                        <td>{index + 1}</td>
                                        <td>{orderId || "N/A"}</td>
                                        <td>${order.totalAmount.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge bg-${order.status === "CANCELLED" ? "danger" : "success"}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{order.paymentMethod}</td>
                                        <td>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                disabled={canceling === orderId || order.status === "CANCELLED"}
                                                onClick={() => cancelOrder(orderId)}
                                            >
                                                {canceling === orderId ? "Cancelling..." : "Cancel Order"}
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
