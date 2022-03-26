import http from './http';
import { dataType } from '@type/type';

const api = '/patient';

export const addPatient = (data: object) => {
    return http.post(`${api}`, data);
}

export const getPatient = (data:dataType) => {
    return http.get(`${api}`, data);
}

export const getPatientById = (data:dataType) => {
    return http.get(`${api}`, data);
}

export const deletePatientById = (data: dataType) => {
    return http.delete(`${api}`, data);
}

export default {
    addPatient,
    getPatient,
    deletePatientById,
    getPatientById
}