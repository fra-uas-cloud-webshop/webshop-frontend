import React, { useState } from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Service = ({ product }) => {
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");

  const addToCart = () => {
    if (product.quantity <= 0) {
      setMessage("⚠️ This product is out of stock!");
      setVariant("danger");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const numericPrice = parseFloat(product.price.replace("$", ""));
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if product exists
    } else {
      cart.push({ ...product, perUnitPrice: numericPrice, quantity: 1 }); // Add new product
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setMessage(`✅ ${product.name} has been added to your cart!`);
    setVariant("success");

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="col mb-5">
      <div className="card" style={{ width: "18rem", height: "24rem" }}>
        <img
          style={{ height: "200px" }}
          src={product.imageUrl}
          className="card-img-top"
          alt={product.name}
        />

        <div className="card-body">
          <Container>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">{product.price}</p>

            {/* Display Alert Messages */}
            {message && <Alert variant={variant}>{message}</Alert>}

            <Row>
              <Col>
                <Link to={`details/${product._id}`} state={{ product }}>
                  <button className="btn btn-sm btn-primary">Details</button>
                </Link>
              </Col>
              <Col>
                <button
                  onClick={addToCart}
                  className="btn btn-sm btn-primary"
                  disabled={product.quantity <= 0}
                >
                  {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Service;
