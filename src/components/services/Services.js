import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Service from './Service';

const Services = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
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
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        if (sortBy === 'name') {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price') {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        }
        
        setFilteredProducts(filtered);
    }, [searchTerm, category, sortBy, products]);
    
    if (products.length === 0) {
        return <Loading />;
    }

    return (
        <div id='tools' className='container'>
            <h3 className='text-center mb-4'>Our Services</h3>
            
            {/* Search, Filter, and Sort Controls */}
            <div className='mb-4 d-flex flex-column'>
                <input 
                    type='text' 
                    className='form-control w-50 mb-2' 
                    placeholder='Search services...' 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className='form-select w-25 mb-2' 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value=''>All Categories</option>
                    <option value='glass'>glass</option>
                    <option value='tool'>tool</option>
                    <option value='cybersecurity'>Cybersecurity</option>
                    <option value='networking'>Networking</option>
                </select>
                <select 
                    className='form-select w-25' 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value=''>Sort By</option>
                    <option value='name'>Name</option>
                    <option value='price'>Price</option>
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
