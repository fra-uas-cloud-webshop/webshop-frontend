import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../common/Loading';
import Service from './Service';

const Services = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [groupedProducts, setGroupedProducts] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                const fetchedProducts = response.data;
                setProducts(fetchedProducts);
                groupByCategory(fetchedProducts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const groupByCategory = (products) => {
        const grouped = products.reduce((acc, product) => {
            const { category } = product;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
        setGroupedProducts(grouped);
    };

    useEffect(() => {
        let filtered = [...products];

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price') {
            filtered.sort((a, b) => a.price - b.price);
        }

        groupByCategory(filtered);
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
                    <option value='glass'>Glass</option>
                    <option value='tool'>Tools</option>
                    <option value='house'>Household Items</option>
                    <option value='paint'>Paints</option>
                    <option value='kitchen'>Kitchen Items</option>
                    <option value='baby'>Baby Items</option>
                    <option value='bathroom'>Bathroom Items</option>
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

            {/* Render Products Grouped by Category */}
            {Object.keys(groupedProducts).map((category) => (
                <div key={category}>
                    <h4 className='mt-4'>{category}</h4>
                    <div className='row g-4'>
                        {groupedProducts[category].map((product) => (
                            <div key={product.id} className='col-md-4 d-flex align-items-stretch'>
                                <Service product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Services;