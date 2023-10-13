import { dataType } from '@type/type';
import http from './http';

const api = '/api/hospital';

export const addHospital = (data:object) => http.post(`${api}/addHospital`, data);

export const getHospitalLogin = (data: dataType) => http.get(`${api}/getHospitalLogin`, data);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addHospital,
  getHospitalLogin,
};
