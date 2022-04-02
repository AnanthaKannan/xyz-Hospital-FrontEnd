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

export const uploadFile = (data:{ file: any, path: string }) => {

    const formData = new FormData();
    formData.append('files', data.file);
    formData.append('path', data.path);
    return http.post(`/upload-image`, formData);
}

export default {
    addPatient,
    listPatient,
    deletePatient,
    getPatient,
    uploadFile,
    updatePatient
}