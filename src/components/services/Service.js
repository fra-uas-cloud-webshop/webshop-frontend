import React from "react";
import { Link } from "react-router-dom";

const Service = ({product}) => {
  return (
    <div className="col mb-5">
        <div className="card" style={{width: '18rem', height: '24rem'}}>
    <img style={{height: '200px'}} src={product.img} className="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{product.productName}</h5>
      <p class="card-text">{product.description}</p>
      <Link to={`details/${product._id}`} state={{ product }}><button product={product} className="btn btn-sm btn-primary">details</button></Link>
    </div>
  </div>
    </div>
  );
};

export default Service;
