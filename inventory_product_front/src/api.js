import axios from 'axios';

const API_URL = 'http://localhost:8000/api';
const API_URL_PARAMETER = 'http://127.0.0.1:8000/api2';

export const getProductTypes = () => {
    return axios.get(`${API_URL_PARAMETER}/product-types`);
};

export const updateInventoryProduct = (id, body) => {
    return axios.patch(`${API_URL}/inventory-product/${id}`, body);
};

export const getInventoryProduct = () => {
    return axios.get(`${API_URL}/inventory-product`);
};

export const postInventoryProduct = (body) => {
    return axios.post(`${API_URL}/inventory-product`, body);
};
