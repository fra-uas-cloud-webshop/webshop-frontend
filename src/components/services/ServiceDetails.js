import React from 'react';
import { useLocation } from "react-router-dom";

const ServiceDetails = () => {
    const location = useLocation();
  const product = location.state?.product; // Retrieve product from state

  if (!product) {
    return <p>No product data available.</p>;
  }
  console.log(product);

    return (
        <div>
            seevice details
            {product.productName}
        </div>
    );
};

export default ServiceDetails;