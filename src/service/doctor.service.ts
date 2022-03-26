import http from './http';
import { dataType } from '@type/type';


const api: string = '/doctor';

export const addDoctor = (data: object) => {
    return http.post(`${api}`, data);
}


export const listDoctor = (data=null) => {
    return http.get(`${api}`, data);
}


export const getDoctor = (data: dataType) => {
    return http.get(`${api}`, data);
}

export const deleteDoctor = (data: dataType) => {
    return http.delete(`${api}`, data);
}

export default {
    addDoctor,
    deleteDoctor,
    listDoctor,
    getDoctor
}