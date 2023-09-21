import http from './http';

const api = '/patientRecord';

export const post = (data: object) => http.post(`${api}`, data);

export const get = (query: string|null) => {
  if (query) return http.get(`${api}?${query}`);
  return http.get(`${api}`);
};

// eslint-disable-next-line no-underscore-dangle
export const delete_ = (_id:number) => http.delete(`${api}/${_id}`);

export const put = (_id:any, data:object) => http.put(`${api}/${_id}`, data);

export default {
  post,
  get,
  delete_,
  put,
};
