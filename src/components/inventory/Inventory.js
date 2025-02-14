import React, { useState, useEffect } from "react";
import { Table, Button, Form, Alert } from "react-bootstrap";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [lowStockWarning, setLowStockWarning] = useState(false);

    // Fetch inventory data from backend
    useEffect(() => {
        fetch("https://manufacturer-epp7.onrender.com/products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                checkLowStock(data);
            })
            .catch(error => console.error("Error fetching inventory:", error));
    }, []);

    // Check for low stock warning
    const checkLowStock = (data) => {
        const lowStockItems = data.filter(item => item.stock < 5); // Assuming < 5 is low stock
        setLowStockWarning(lowStockItems.length > 0);
    };

    return (
        <div className="container mt-4">
            <h2>Inventory Management</h2>

            {lowStockWarning && (
                <Alert variant="danger">Some products are low in stock!</Alert>
            )}

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id} className={product.stock < 5 ? "table-danger" : ""}>
                            <td>{index + 1}</td>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2">
                                    Update
                                </Button>
                                <Button variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Inventory;
