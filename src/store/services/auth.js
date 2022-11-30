import axios from 'axios';
import { API } from '../../config';

// Login
export const login = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`login_check`, data);
}

// Check if email already exists
export const checkMail = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`user/checkemail`, data);
}

// Save login for last connection
export const saveLogin = async () => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }).put(`api/user/connection`, {});
}

// Register
export const register = async (data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`register`, data);
}

// Register when invited
export const registerInvited = async (userId, data) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`company/members/${userId}/register-member`, data);
}

// Forgotten password
export const forgotPwd = async (email) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).post(`user/request-reset-password`, { email });
}

// Reset password
export const resetPwd = async (pwd, token) => {
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json'
        },
    }).put(`user/reset-password`, {
        password: pwd,
        token: token
    });
}