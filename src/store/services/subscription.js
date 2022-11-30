import axios from 'axios';
import { API } from '../../config';

// Get subscription prices
export const getPriceAboData = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`paiement/panier`, data);
}

// Get DocuSign link
export const sendSignContract = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`signature/lettre`, data);
}

//Recurring payment
export const recurrentPayment = async (data) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post('checkout/subscription', data);
}