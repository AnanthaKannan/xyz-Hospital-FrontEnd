import http from './http';
import { dataType } from '@type/type';

const api = '/patient';

export const addPatient = (data: object) => {
    console.log('dataObj', data);
    return http.post(`${api}`, data);
}

export const listPatient = (data:dataType) => {
    return http.get(`${api}`, data);
}

export const getPatient = (data:dataType) => {
    return http.get(`${api}`, data);
}

export const deletePatient = (_id:number) => {
    return http.delete(`${api}/${_id}`);
}

export const updatePatient = (_id:any, data:object) => {
    return http.put(`${api}/${_id}`, data);
}

export default {
    addPatient,
    listPatient,
    deletePatient,
    getPatient,
    updatePatient
}