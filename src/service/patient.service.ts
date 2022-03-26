import http from './http';
import { dataType } from '@type/type';

const api = '/patient';

export const addPatient = (data: object) => {
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

export default {
    addPatient,
    listPatient,
    deletePatient,
    getPatient
}