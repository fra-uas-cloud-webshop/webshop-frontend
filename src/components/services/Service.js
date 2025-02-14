import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Service = ({product}) => {


  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const numericPrice = parseFloat(product.perUnitPrice.replace("$", ""));

    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
    } else {
        cart.push({ ...product,perUnitPrice:numericPrice, quantity: 1 }); // Add new product
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
//     <div class="alert alert-success" role="alert">
//   (`${product.name} has been added to your cart.`);!
// </div>

    // setTimeout(() => setCartMessage(""), 3000);
};

  return (
    <div className="col mb-5">
        <div className="card" style={{width: '18rem', height: '24rem'}}>
    <img style={{height: '200px'}} src={product.img} className="card-img-top" alt="..." />
    
    <div classname="card-body ">
    <Container>
      <h5 classname="card-title">{product.productName}</h5>
      <p classname="card-text">{product.description}</p>
    
      <p classname="card-text">{product.perUnitPrice}</p>
    
    <Row>
      <Col> <Link to={`details/${product._id}`} state={{ product }}><button product={product} className=" btn btn-sm btn-primary">details</button></Link>
      </Col>
      <Col>
     <button onClick={ addToCart} className=" btn btn-sm btn-primary">add to cart</button>
     </Col>
     </Row>
     </Container>
     
    </div>
  </div>
    </div>
  );
};

export default Service;
