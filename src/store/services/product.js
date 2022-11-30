import axios from 'axios';
import { API } from '../../config';

//Post product description
export const postProductDescription = async (data, productId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${productId}/content`, data);
}


//Post product files
export const postProductFiles = async (data, productId) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${productId}/file`, data);
}

//Post project product list
export const postProjectProductList = async (data, projectId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/product`, data);
}


//Get product workflow
export const getProductWorkflow = async (projectId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/workflowproduct/${projectId}`);
}


//Get product categories
export const getProductCategories = async () => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/category`);
}


//Post product categories
export const postProductCategories = async (data, productId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/product/${productId}/category`, data);
}


//Get product types
export const getProductTypes = async () => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/gamme`);
}


//Post product type
export const postProductType = async (data, productId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/product/${productId}/gamme`, data);
}


//Get product materials
export const getProductMaterials = async () => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/matter`);
}


//Post product type
export const postProductMaterials = async (data, productId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/product/${productId}/matter`, data);
}


//Post product weights
export const postProductWeights = async (data, productId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/product/${productId}/grammage`, data);
}

//Get countries of manufacture
export const getCountriesOfManufacture = async () => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/country`);
}


//Post product's country of manufacture
export const postProductCountryOfManufacture = async (data, productId) => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/product/${productId}/country`, data);
}