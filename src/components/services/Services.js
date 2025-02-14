import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Service from './Service';

const Services = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    useEffect(() => {
        axios.get('https://manufacturer-epp7.onrender.com/products')
        .then(data => {
            const reversedProducts = data.data.reverse();
            setProducts(reversedProducts);
            setFilteredProducts(reversedProducts);
        });  
    }, []);
    
    useEffect(() => {
        let filtered = products;
        
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }
        
        setFilteredProducts(filtered);
    }, [searchTerm, category]);
    
    if (products.length === 0) {
        return <Loading />;
    }

    return (
        <div id='tools' className='container'>
            <h3 className='text-center mb-4'>Our Services</h3>
            
            {/* Search and Sort Controls */}
            <div className='mb-4 d-flex flex-column'>
                <input 
                    type='text' 
                    className='form-control w-50 mb-4' 
                    placeholder='Search services...' 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className='form-select w-25' 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value=''>All Categories</option>
                    <option value='web-development'>Web Development</option>
                    <option value='cloud-services'>Cloud Services</option>
                    <option value='cybersecurity'>Cybersecurity</option>
                    <option value='networking'>Networking</option>
                </select>
            </div>
            
            <div className='row g-4'>
                {
                    filteredProducts.map((product, index) => (
                        <div key={index} className='col-md-4 d-flex align-items-stretch'>
                            <Service product={product} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;
