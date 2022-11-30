import axios from 'axios';
import { API } from '../../config';

//Get studied projects
export const getStudiedProjects = async () => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get('api/etude/project');
}


//Get past commands
export const getPastCommands = async () => {

    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get('api/done/project');
}


//Get current commands
export const getCurrentCommands = async () => {
    
    const token = localStorage.getItem('session');

    return await axios.create({
        baseURL: API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).get('api/inprogress/project');
}