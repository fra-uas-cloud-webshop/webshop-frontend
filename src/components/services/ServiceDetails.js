import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import config from "../../config";

const ServiceDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setLoading(false);

                // Check if the product is already in the cart
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const isAlreadyInCart = cart.some((item) => item.id === data.id);
                setAddedToCart(isAlreadyInCart);
            })
            .catch(() => {
                setError("Failed to load product details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading product details...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!product) return <p>Product not found.</p>;

    const addToCart = () => {
        if (product.quantity <= 0 || addedToCart) return; // Prevent adding out-of-stock or already-added items

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if product exists
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new product
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // Disable button & change text
        setAddedToCart(true);
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6} className="mb-4">
                    <Card className="shadow-lg p-3">
                        <Card.Img 
                            variant="top" 
                            src={product.imageUrl || "https://via.placeholder.com/300"} 
                            alt={product.name} 
                            className="img-fluid rounded"
                        />
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-lg p-3">
                        <Card.Body>
                            <Card.Title className="fw-bold">{product.name}</Card.Title>
                            <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                            <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                            <Card.Text className="text-success fw-bold">
                                <strong>Price:</strong> ${product.price}
                            </Card.Text>
                            <Card.Text>
                                <strong>Stock:</strong> {product.quantity} 
                                {product.quantity < 5 && <span className="text-danger"> (Low Stock!)</span>}
                            </Card.Text>

                            <Button 
                                variant={addedToCart ? "success" : "primary"} 
                                onClick={addToCart} 
                                disabled={product.quantity === 0 || addedToCart}
                                className="w-100"
                            >
                                {product.quantity === 0
                                    ? "Out of Stock"
                                    : addedToCart
                                    ? "Item in Cart "
                                    : "Add to Cart"}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ServiceDetails;
