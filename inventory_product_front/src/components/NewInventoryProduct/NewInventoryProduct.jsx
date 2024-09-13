import React, { useState, useEffect } from 'react';
import { getProductTypes, postInventoryProduct } from '../../api';
import './NewInventoryProduct.css';

const InventoryForm = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        serialNumber: '',
        productType: '',
        date: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                const response = await getProductTypes();
                setProductTypes(response.data);
            } catch (error) {
                console.error('Error consultando tipos:', error);
            }
        };

        fetchProductTypes();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'El nombre de usuario es obligatorio';
        if (!formData.serialNumber) newErrors.serialNumber = 'El número de serie es obligatorio';
        if (!formData.productType) newErrors.productType = 'El tipo de producto es obligatorio';
        if (!formData.date) newErrors.date = 'La fecha es obligatoria';
        return newErrors;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log('Formulario válido:', formData);
            await postInventoryProduct({
                product_type: formData.productType,
                serial_number: formData.serialNumber,
                shipping_status: false
            });
            setFormData({
                username: '',
                serialNumber: '',
                productType: '',
                date: ''
            });
            alert("Creación exitosa");
        }
    };

    return (
        <div className="inventory-form-container">
            <h1>Registro de inventario</h1>
            <form onSubmit={handleSubmit} className="inventory-form">
                <div className="form-group">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Nombre de usuario"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={errors.username ? 'error-input' : ''}
                    />
                    {errors.username ? <span className="error-message">{errors.username}</span> : ''}
                </div>

                <div className='row'>
                    <div className="form-group width-19">
                        <select
                            id="productType"
                            name="productType"
                            value={formData.productType}
                            onChange={handleInputChange}
                            className={errors.productType ? 'error-input' : ''}
                        >
                            <option disabled value="">Productos</option>
                            {productTypes.map(product => (
                                <option value={product.id} >
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        {errors.productType ? <span className="error-message">{errors.productType}</span> : ''}
                    </div>

                    <div className="form-group width-79">
                        <input
                            id="serialNumber"
                            name="serialNumber"
                            type="number"
                            placeholder="Número de serie"
                            value={formData.serialNumber}
                            onChange={handleInputChange}
                            className={errors.serialNumber ? 'error-input' : ''}
                        />
                        {errors.serialNumber ? <span className="error-message">{errors.serialNumber}</span> : ''}
                    </div>
                </div>

                <div className="form-group">
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={errors.date ? 'error-input' : ''}
                    />
                    {errors.date ? <span className="error-message">{errors.date}</span> : ''}
                </div>

                <button type="submit" className="submit-btn">Guardar y enviar</button>
            </form>
        </div>
    );
};

export default InventoryForm;
