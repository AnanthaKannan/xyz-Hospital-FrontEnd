import { dataType } from '@type/type';
import http from './http';

const api = '/patient';

export const addPatient = (data: object) => http.post(`${api}`, data);

export const listPatient = (data:dataType) => http.get(`${api}`, data);

export const getPatient = (data:dataType) => http.get(`${api}`, data);

export const deletePatient = (_id:number) => http.delete(`${api}/${_id}`);

export const updatePatient = (_id:any, data:object) => http.put(`${api}/${_id}`, data);

export const uploadFile = (data:{ file: any, path: string }) => {
  const formData = new FormData();
  formData.append('files', data.file);
  formData.append('path', data.path);
  return http.post('/upload-image', formData);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addPatient,
  listPatient,
  deletePatient,
  getPatient,
  uploadFile,
  updatePatient,
};
