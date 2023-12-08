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

export const listFeedBack = (params) => http.get('/feedback',{ params });

export const addFeedBack = (data) => http.post('/feedback', data);

export const updateFeedBack = (id, data) => http.put(`/feedback/${id}`, data);
