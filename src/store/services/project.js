import axios from 'axios';
import { API } from '../../config';

//Post project name
export const postProjectName = async (data, projectId) => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/title`, data);
}

//Post project files
export const postProjectFiles = async (data, projectId) => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/file`, data);
}

//Delete project files
export const deleteFileById = async (fileId) => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).delete(`api/project/${fileId}/file`);
}

//Post project info
export const postProjectInfo = async (data, projectId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/info`, data);
}

//Post project budget
export const postProjectBudget = async (data, projectId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/budget`, data);
}

//Post project description
export const postProjectDescription = async (data, projectId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/content`, data);
}

//Post project delay
export const postProjectDelay = async (data, projectId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/delais`, data);
}


//Post project delivery place
export const postProjectDeliveryPlace = async (data, projectId) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/livraison`, data);
}

//Get workflow type
export const getWorkFlowType = async (projectId) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/workflowtype/${projectId}`);
}


//Get list of types
export const getTypesList = async () => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/type`);
}


//Post project types
export const postProjectTypes = async (data) => {
    const token = localStorage.getItem('session');
    
    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/test/type`, data);
}

//Get if project is in creation
export const getIfProjectIsInCreation = async () => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post('api/checkprojet', {});
}


//Get project ressources
export const getProjectRessources = async (projectId) => {
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get(`api/project/${projectId}`);
}

//Get project details
export const getProjectDetails = async (data) => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        } 
    }).get(`api/project/${data.id}`);
}

//Validate a project so it can be shown in the dashboard project list
export const validateProject = async (projectId) => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/end`, {});
}

//Make project go to next step
export const makeProjectGoToNextStep = async (data, projectId) => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).post(`api/project/${projectId}/step`, data);
}