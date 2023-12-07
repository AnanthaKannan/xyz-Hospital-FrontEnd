import axios from 'axios';
import config from '../config'

const BASE_ULR = config.apiURL

const http = axios.create({
  baseURL: 'url',
  headers: {
    'content-type': 'application/json',
    Authorization: `${localStorage.getItem('token')}`,
  }
})
http.defaults.headers.common['Authorization'] = localStorage.getItem('token');
http.interceptors.request.use(async (config) => config)

export const listFeedBack = (params) => http.get(`${BASE_ULR}/feedback`,{ params });

export const addFeedBack = (data) => http.post(`${BASE_ULR}/feedback`, data);

export const updateFeedBack = (id, data) => http.put(`${BASE_ULR}/feedback/${id}`, data);
