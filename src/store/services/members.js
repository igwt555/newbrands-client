import axios from 'axios';
import { API } from '../../config';

// Get list of company members
export const getListMembers = async (companyId) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/company/${companyId}/members`, {
        page: 1,
        maxPerPage: 15
    });
}

// Send invite mail
export const sendInvite = async (data) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/company/members/invite`, data);
}

// Re-send invite mail
export const resendInvite = async (userId) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/company/members/${userId}/re-invite`, {});
}

// Activate/Deactivate member
export const handleActivationMember = async (userId) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).put(`api/company/members/${userId}/disable`, {});
}

// Delete member
export const deleteMember = async (userId) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).delete(`api/company/members/${userId}/delete`);
}

// Edit role member
export const editRoleMember = async (userId, data) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).put(`api/company/members/${userId}/change-role`, data);
}

// Get number of licenses left and max
export const getNbLicenses = async (companyId) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/company/${companyId}/licences-restantes`);
}