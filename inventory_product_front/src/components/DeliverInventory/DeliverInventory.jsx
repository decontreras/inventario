import React, { useState, useEffect } from 'react';
import { getInventoryProduct, updateInventoryProduct, getProductTypes } from '../../api';
import './DeliverInventory.css';

const DeliverInventory = () => {
    const [inventaryProduct, setInventaryProduct] = useState([]);
    const [productTypes, setProductTypes] = useState([]);

    useEffect(() => {
        fetchProductTypes();
        fetchProducts();
    }, []);

    const fetchProductTypes = async () => {
        try {
            const response = await getProductTypes();
            setProductTypes(response.data);
        } catch (error) {
            console.error('Error consultando tipos:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await getInventoryProduct();
            setInventaryProduct(response.data);
        } catch (error) {
            console.error('Error consultando inventario:', error);
        }
    };

    const handleSubmit = async (product) => {
        if (!product.shipping_status) {
            product.shipping_status = true;
            await updateInventoryProduct(
                product.id,
                product
            );
            alert("Envio exitoso");
            fetchProducts();
        }
    };

    return (
        <div className="inventory-form-container">
            <h1>Entregar inventario</h1>
            {inventaryProduct.map(product => (
                <div className='product-container'>
                    <div className='text-container'>
                        <span className='product-type'>{productTypes.find(e => e.id == product.product_type)?.name}</span>
                        <div className='shipping-status'>{product.serial_number}</div>
                    </div>
                    <button
                        className={product.shipping_status ? "submit-btn-green" : "submit-btn"}
                        onClick={() => handleSubmit(product)}>
                        {product.shipping_status ? "Entregado" : "Entregar"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DeliverInventory;
