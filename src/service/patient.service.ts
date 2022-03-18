import http from './http';
import { dataType } from '@type/type';

const api = '/api/patient';

export const addPatient = (data: object) => {
    return http.post(`${api}/addPatient`, data);
}

export const getPatient = (data:dataType) => {
    return http.get(`${api}/getPatient`, data);
}

export const getPatientById = (data:dataType) => {
    return http.get(`${api}/getPatientById`, data);
}

export const deletePatientById = (data: dataType) => {
    return http.delete(`${api}/deletePatientById`, data);
}

export default {
    addPatient,
    getPatient,
    deletePatientById,
    getPatientById
}