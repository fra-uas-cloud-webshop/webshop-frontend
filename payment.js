import React, { useState } from 'react';
import './responsive.css';


const CheckoutPage = () => {
    const [shippingMethod, setShippingMethod] = useState('regular');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    return (
        <div className="bg-blue-200 min-h-screen p-4">
            <div className="flex justify-between items-center bg-blue-700 text-white p-4">
                <div>LowTECH</div>
                <div className="flex items-center">
                    <span>Emin Guliyev</span>
                    <img src="user-icon.png" alt="User" className="w-6 ml-2" />
                    <img src="drop_down.png" alt="Drop Up" className="w-3 ml-2" />
                </div>
            </div>
            <div className="bg-white w-4/5 mx-auto p-6 shadow-md mt-10 flex">
                <div className="w-1/3 p-4">
                    <h2 className="border-b-2 pb-2 mb-4">1. Billing Address</h2>
                    <div className="grid gap-3">
                        <input type="text" placeholder="First Name" className="border p-3 rounded-md" />
                        <input type="text" placeholder="Last Name" className="border p-3 rounded-md" />
                        <input type="email" placeholder="Email Address" className="border p-3 rounded-md" />
                        <input type="text" placeholder="Telephone" className="border p-3 rounded-md" />
                        <input type="text" placeholder="Billing Address" className="border p-3 rounded-md" />
                        <input type="text" placeholder="Suburb/Town" className="border p-3 rounded-md" />
                        <input type="text" placeholder="State/Territory" className="border p-3 rounded-md" />
                        <input type="text" placeholder="Postcode" className="border p-3 rounded-md" />
                        <input type="text" placeholder="Country" className="border p-3 rounded-md" />
                    </div>
                </div>
                <div className="w-1/3 p-4">
                    <h2 className="border-b-2 pb-2 mb-4">2. Shipping Method</h2>
                    <label className="block mb-2">
                        <input type="radio" name="shipping" checked={shippingMethod === 'regular'} onChange={() => setShippingMethod('regular')} /> Regular (8-21 days) - FREE
                    </label>
                    <label className="block mb-4">
                        <input type="radio" name="shipping" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} /> Express (3-4 days, tracking) - $10.00
                    </label>
                    <h2 className="border-b-2 pb-2 mb-4">3. Payment Method</h2>
                    <div className="flex items-center mb-2">
                        <img src="credit_card.png" alt="Credit Card" className="w-10 mr-2" />
                        <input type="radio" name="payment" checked={paymentMethod === 'creditCard'} onChange={() => setPaymentMethod('creditCard')} /> Credit Card
                    </div>
                    <div className="grid gap-3">
                        <input type="text" placeholder="Credit Card Number" className="border p-3 rounded-md" />
                        <input type="text" placeholder="Expiration Date (MM/YY)" className="border p-3 rounded-md" />
                        <input type="text" placeholder="Card Verification Number" className="border p-3 rounded-md" />
                    </div>
                    <div className="flex items-center mt-4">
                        <img src="paypal.png" alt="PayPal" className="w-10 mr-2" />
                        <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} /> PayPal
                    </div>
                </div>
                <div className="w-1/3 p-4">
                    <h2 className="border-b-2 pb-2 mb-4">4. Review Your Order</h2>
                    <div className="border p-4 rounded-md mb-4">
                        <p><strong>Note Sleeve</strong></p>
                        <p>Color: Black</p>
                        <p>Finish: Leather</p>
                        <p>Qty: 1</p>
                        <p><strong>Price: 89.00 EUR</strong></p>
                    </div>
                    <p>Subtotal: 89.00 EUR</p>
                    <p>Shipping: 0.00 EUR</p>
                    <p><strong>Grand Total: 89.00 EUR</strong></p>
                    <button className="w-full p-3 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600">PLACE ORDER</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
