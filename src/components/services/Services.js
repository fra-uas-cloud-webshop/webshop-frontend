import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Service from './Service';

const Services = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        axios.get('https://manufacturer-epp7.onrender.com/products')
        .then(data => loadProducts(data.data));  
    },[]);  

    const loadProducts = arr =>{
        setProducts(arr.reverse().slice(0,6));        
    }
    

    if(!products){
        return <Loading></Loading>
    }
    return (
        <div id='tools'>
            <h3 className='container text-center mb-5'>Our services</h3>
            <div className='row'>
                {
                    products.map((product, index) => <Service
                    key={index}
                    product={product}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;