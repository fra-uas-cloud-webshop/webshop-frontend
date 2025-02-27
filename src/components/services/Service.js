import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Service = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    // Check if the product is already in the cart when the component loads
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = cart.some((item) => item.id === product.id);
    setAddedToCart(isAlreadyInCart);
  }, [product.id]);

  const addToCart = () => {
    if (product.quantity <= 0 || addedToCart) return; // Prevent adding out-of-stock or already-added items

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const numericPrice = parseFloat(product.price);
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if product exists
    } else {
      cart.push({ ...product, perUnitPrice: numericPrice, quantity: 1 }); // Add new product
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Disable button & change text
    setAddedToCart(true);
  };

  return (
    <div className="col mb-5">
      <div className="card" style={{ width: "18rem", height: "24rem" }}>
        <img
          style={{ height: "200px", objectFit: "cover" }}
          src={product.imageUrl}
          className="card-img-top"
          alt={product.name}
        />

        <div className="card-body d-flex flex-column justify-content-between">
          <Container>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text text-truncate">{product.description}</p>
            <p className="card-text fw-bold">${product.price}</p>

            <Row>
              <Col>
                <Link to={`details/${product.id}`} state={{ product }}>
                  <button className="btn btn-sm btn-primary w-100">Details</button>
                </Link>
              </Col>
              <Col>
                <button
                  onClick={addToCart}
                  className={`btn btn-sm w-100 ${addedToCart ? "btn-success" : "btn-primary"}`}
                  disabled={product.quantity <= 0 || addedToCart}
                >
                  {product.quantity <= 0
                    ? "Out of Stock"
                    : addedToCart
                    ? "Item in Cart "
                    : "Add to Cart"}
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
