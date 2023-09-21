import { dataType } from '@type/type';
import http from './http';

const api: string = '/doctor';

export const post = (data: object) => http.post(`${api}`, data);

export const list = (data = null) => http.get(`${api}`, data);

export const get = (data: dataType) => http.get(`${api}`, data);

export const delete_ = (_id: number) => http.delete(`${api}/${_id}`);

export const put = (_id:number, data:object) => http.put(`${api}/${_id}`, data);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  list,
  post,
  get,
  delete_,
  put,
};
