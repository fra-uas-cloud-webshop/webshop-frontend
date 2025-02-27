import React, { useState, useEffect } from "react";
import { Button, Form, Alert, Table, Spinner } from "react-bootstrap";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(null);
    const [cancelling, setCancelling] = useState(null);

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

    const updateOrderStatus = async (order, newStatus) => {
        const orderId = order.items?.length > 0 ? order.items[0].orderId : null;

        if (!orderId) {
            setError("Order ID not found!");
            return;
        }

        if (order.status === "CANCELLED") {
            setError("Cannot update a cancelled order.");
            return;
        }

        setUpdating(orderId);

        try {
            const response = await fetch(`http://localhost:8080/api/orders/status?orderId=${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newStatus),
            });

            if (!response.ok) {
                throw new Error("please ensure you have enough product in stock!");
            }

            const updatedOrder = await response.json();
            setOrders(orders.map(o => (o.items[0]?.orderId === orderId ? updatedOrder : o)));
        } catch (err) {
            setError(err.message);
        } finally {
            setUpdating(null);
        }
    };

    const cancelOrder = async (order) => {
        const orderId = order.items?.length > 0 ? order.items[0].orderId : null;

        if (!orderId) {
            setError("Order ID not found!");
            return;
        }

        if (order.status === "CANCELLED") {
            setError("This order is already cancelled.");
            return;
        }

        setCancelling(orderId);

        try {
            const response = await fetch(`http://localhost:8080/api/orders/cancel?orderId=${orderId}`, {
                method: "PUT",
            });

            if (!response.ok) {
                throw new Error("Failed to cancel order.");
            }

            const updatedOrder = await response.json();
            setOrders(orders.map(o => (o.items[0]?.orderId === orderId ? updatedOrder : o)));
        } catch (err) {
            setError(err.message);
        } finally {
            setCancelling(null);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Manage Orders</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Loading orders...</p>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Update Status</th>
                            <th>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            const orderId = order.items?.length > 0 ? order.items[0].orderId : "N/A";
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{orderId}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.customerEmail}</td>
                                    <td>{order?.items[0]?.quantity}</td>
                                    <td>${order.totalAmount.toFixed(2)}</td>
                                    <td>
                                        <span className={`badge bg-${order.status === "DELIVERED" ? "success" : order.status === "PENDING" ? "warning" : order.status === "CANCELLED" ? "danger" : "primary"}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Form.Select
                                            disabled={updating === orderId || order.status === "CANCELLED"}
                                            onChange={(e) => updateOrderStatus(order, e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="PENDING" disabled={order.status !== "PENDING"}>Pending</option>
                                            <option value="PROCESSED" disabled={order.status === "SHIPPED" || order.status === "DELIVERED"}>Processing</option>
                                            <option value="SHIPPED" disabled={order.status === "DELIVERED"}>Shipping</option>
                                            <option value="DELIVERED">Completed</option>
                                        </Form.Select>
                                        {updating === orderId && <p className="text-primary mt-1">Updating...</p>}
                                    </td>
                                    <td>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => cancelOrder(order)} 
                                            disabled={cancelling === orderId || order.status === "CANCELLED"}
                                        >
                                            {cancelling === orderId ? "Cancelling..." : "Cancel Order"}
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default OrderManagement;
