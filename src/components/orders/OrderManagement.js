import React, { useState, useEffect } from "react";
import { Button, Form, Alert, Table } from "react-bootstrap";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8080/api/orders");
            if (!response.ok) {
                throw new Error("Failed to fetch orders.");
            }
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        setUpdating(orderId);
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStatus),
            });

            if (!response.ok) {
                throw new Error("Failed to update order status.");
            }

            const updatedOrder = await response.json();
            setOrders(orders.map(order => (order.id === orderId ? updatedOrder : order)));
        } catch (err) {
            setError(err.message);
        } finally {
            setUpdating(null);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Manage Orders</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.customerEmail}</td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td>
                                    <span className={`badge bg-${order.status === "COMPLETED" ? "success" : order.status === "PENDING" ? "warning" : "primary"}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <Form.Select
                                        disabled={updating === order.id}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="PROCESSED">Processing</option>
                                        <option value="DELIVERED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </Form.Select>
                                    {updating === order.id && <p>Updating...</p>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default OrderManagement;
