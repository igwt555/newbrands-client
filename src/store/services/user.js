import axios from 'axios';
import { API } from '../../config';

// Get profile information
export const getProfileInformation = async () => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get('api/user');
}

// Get social address
export const getAddressSocial = async () => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('session')
        },
    }).get(`api/address/social`);
}

// Edit social address
export const editAddressSocial = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('session')
        },
    }).put(`api/address/edit/social`, data);
}

// Edit password
export const editPassword = async (data) => {

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).put(`api/user/password`, data);
}

// Edit social address
export const postSocialAddress = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`company/address/social`, data);
}

// Edit social address
export const editInfoUser = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`api/address/edit/info-user`, data);
}