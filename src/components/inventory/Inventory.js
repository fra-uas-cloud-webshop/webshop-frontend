import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert, Container, Badge } from "react-bootstrap";
import config from "../../config";

const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showQuantityModal, setShowQuantityModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/products`);
            if (!response.ok) throw new Error("Failed to fetch products.");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct({ ...product });
        setShowEditModal(true);
    };

    const handleQuantityEdit = (product) => {
        setSelectedProduct({ ...product });
        setShowQuantityModal(true);
    };

    const handleClose = () => {
        setShowEditModal(false);
        setShowQuantityModal(false);
        setSelectedProduct(null);
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    const handleChange = (e) => {
        setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/products/${selectedProduct.inventoryId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: selectedProduct.name,
                    description: selectedProduct.description,
                }),
            });

            if (!response.ok) throw new Error("Failed to update product details.");

            await fetchProducts();
            setSuccessMessage("Product details updated successfully!");
            setTimeout(() => handleClose(), 1000);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityUpdate = async () => {
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/inventory/${selectedProduct.inventoryId}?quantity=${selectedProduct.quantity}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Failed to update quantity.");

            await fetchProducts();
            setSuccessMessage("Quantity updated successfully!");
            setTimeout(() => handleClose(), 1000);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (inventoryId) => {
        setDeleting(inventoryId);
        setErrorMessage(null);

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/products/${inventoryId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete product.");

            setProducts(products.filter((p) => p.inventoryId !== inventoryId));
            setSuccessMessage("Product deleted successfully!");
        } catch (error) {
            setErrorMessage("you cannot delete a product which is ordered by customer!, that's unethical!");
        } finally {
            setDeleting(null);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Inventory Management</h2>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Inventory ID</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.inventoryId}>
                            <td>{index + 1}</td>
                            <td>{product.inventoryId}</td>
                            <td>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width="50"
                                    height="50"
                                    className="me-2"
                                />
                                {product.name}
                            </td>
                            <td>{product.category}</td>
                            <td>
                                {product.quantity}{" "}
                                {product.quantity < 10 && <Badge bg="danger">Low Stock</Badge>}
                            </td>
                            <td>
           {/* <Button variant="outline-dark" size="sm" className="me-2" onClick={() => handleEdit(product)}>
                                    Edit
                                </Button> */}
                                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleQuantityEdit(product)}>
                                    Update Quantity
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(product.inventoryId)}
                                    disabled={deleting === product.inventoryId}
                                >
                                    {deleting === product.inventoryId ? "Deleting..." : "Delete"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Name & Description Modal */}
            <Modal show={showEditModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" name="name" value={selectedProduct.name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" value={selectedProduct.description} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" size="sm" onClick={handleUpdate} disabled={loading}>
                        {loading ? "Updating..." : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Update Quantity Modal */}
            <Modal show={showQuantityModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <Form.Group className="mb-3">
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={selectedProduct.quantity}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" size="sm" onClick={handleQuantityUpdate} disabled={loading}>
                        {loading ? "Updating..." : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default InventoryPage;
