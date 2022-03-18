import http from './http';
import { dataType } from '@type/type';
const api = '/api/hospital';

export const addHospital = (data:object) => {
    return http.post(`${api}/addHospital`, data);
}

export const getHospitalLogin = (data: dataType) => {
    return http.get(`${api}/getHospitalLogin`, data);
}

export default {
    addHospital,
    getHospitalLogin
}