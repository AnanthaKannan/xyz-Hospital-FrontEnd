import http from './http';
import { dataType } from '@type/type';


const api: string = '/api/doctor';

export const addDoctor = (data: object) => {
    return http.post(`${api}/addDoctor`, data);
}


export const getDoctorListByHospitalId = (_id:string, data: dataType) => {
    return http.get(`${api}/getDoctorListByHospitalId`, data);
}


export const getDoctorDetailById = (data: dataType) => {
    return http.get(`${api}/getDoctorDetailById`, data);
}

export const deleteDoctorById = (data: dataType) => {
    return http.delete(`${api}/deleteDoctorById`, data);
}

export default {
    addDoctor,
    deleteDoctorById,
    getDoctorListByHospitalId,
    getDoctorDetailById
}