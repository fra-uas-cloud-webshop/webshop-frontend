import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderConfirmation = () => {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
            <div className="bg-white p-4 p-md-5 rounded-3 shadow-lg text-center w-100" style={{ maxWidth: '400px' }}>
                {/* Bootstrap Check Icon */}
                <i className="bi bi-check-circle-fill text-success display-4"></i>
                
                <h2 className="mt-3 fw-bold text-dark">Your Order is Confirmed!</h2>
                <p className="text-muted small">
                    Thank you for shopping with us. You can track your order status below.
                </p>

                <Link 
                    to="/myOrders"
                    className="btn btn-primary mt-3 px-4 py-2 fw-semibold"
                >
                    View Order Status
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
