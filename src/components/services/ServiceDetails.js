import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";

const ServiceDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartMessage, setCartMessage] = useState("");

    // Fetch product details from API or mock data
    useEffect(() => {
        fetch(`https://manufacturer-epp7.onrender.com/product/${id}`)
            .then(response => response.json())
            .then(data => {
                // Ensure price is a number and remove '$' if present
                const formattedProduct = { ...data, perUnitPrice: parseFloat(data.perUnitPrice.replace("$", "")) };
                setProduct(formattedProduct);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load product details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading product details...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!product) return <p>Product not found.</p>;

    // Function to add product to cart (uses localStorage)
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item._id === product._id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if product exists
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new product
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
        setCartMessage(`${product.productName} has been added to your cart.`);
        setTimeout(() => setCartMessage(""), 3000);
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <Card className="shadow-lg p-3">
                        <Card.Img 
                            variant="top" 
                            src={product.img || "https://via.placeholder.com/300"} 
                            alt={product.productName} 
                            className="img-fluid rounded"
                        />
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow-lg p-3">
                        <Card.Body>
                            <Card.Title className="fw-bold">{product.productName}</Card.Title>
                            <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
                            <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                            <Card.Text className="text-success fw-bold">
                                <strong>Price:</strong> ${product.perUnitPrice}
                            </Card.Text>
                            <Card.Text>
                                <strong>Stock:</strong> {product.availableQuantity} 
                                {product.availableQuantity < 5 && <span className="text-danger"> (Low Stock!)</span>}
                            </Card.Text>

                            {cartMessage && <Alert variant="success">{cartMessage}</Alert>}

                            <Button 
                                variant="primary" 
                                onClick={addToCart} 
                                disabled={product.availableQuantity === 0}
                                className="me-2"
                            >
                                {product.availableQuantity > 0 ? "Add to Cart" : "Out of Stock"}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ServiceDetails;
