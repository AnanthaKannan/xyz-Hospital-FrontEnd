import http from './http';
import { dataType } from '@type/type';


const api: string = '/doctor';

export const post = (data: object) => {
    return http.post(`${api}`, data);
}


export const list = (data=null) => {
    return http.get(`${api}`, data);
}


export const get = (data: dataType) => {
    return http.get(`${api}`, data);
}

export const delete_ = (_id: number) => {
    return http.delete(`${api}/${_id}`);
}

export const put = (_id:number, data:object) => {
    return http.put(`${api}/${_id}`, data);
}

export default {
    list,
    post,
    get,
    delete_,
    put
}