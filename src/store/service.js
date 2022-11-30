import axios from 'axios';
import { API } from '../config';

export * from './services/auth';
export * from './services/user';
export * from './services/subscription';
export * from './services/project';
export * from './services/product';
export * from './services/dashboard';
export * from './services/members';

//Get suggestion enterprise data
export const getEnterpriseData = async (param) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
        } 
    }).get(`pappers/${param}`);
}

//Upload file
export const uploadFile = async (data, mode) => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/upload/${mode}`, data);
}

//Get order information
export const getOrderInformation = async () => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get('api/order');
}

// Get url Monetico
export const sendGetUrlPaiement = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`/monetico/payement`, data);
}

//Stop payment
export const stopPayment = async () => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post('api/monetico/payement/stop');
}

//Deffered payment
export const deferredPayment = async (data) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post('api/monetico/payement-differe', data);
}

// Get token to listen to Mercure
export const getMercureAccess = async (userId) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        }
    }).get(`mercure/access/${userId}`);
}

// Send contact email
export const sendEmailContact = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).post(`send/email/contact`, data);
}