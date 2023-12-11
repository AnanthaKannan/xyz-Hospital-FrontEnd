import axios from 'axios';
import config from '../config'

const BASE_ULR = config.apiURL

const http = axios.create({
  baseURL: BASE_ULR,
  headers: { 'content-type': 'application/json' }
})

http.interceptors.request.use(async (config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config
});

http.interceptors.response.use((response) => response, 
(error) => {
  if(error.response.status === 401) {
    window.location.href = 'login';
  }
  return Promise.reject(error); 
});

export const listFeedBack = (params) => http.get('/feedback',{ params });

export const addFeedBack = (data) => http.post('/feedback', data);

export const updateFeedBack = (id, data) => http.put(`/feedback/${id}`, data);

export const listPatient = (params) => http.get('/patient', { params });

export const deletePatient = (id) => http.delete(`/patient/${id}`);

export const listDoctor = (params) => http.get('/doctor', { params });

export const deleteDoctor = (id) => http.delete(`/doctor/${id}`);
