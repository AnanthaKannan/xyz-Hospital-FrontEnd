import http from './http';
import { dataType } from '@type/type';

const api = '/patientRecord';

export const post = (data: object) => {
    return http.post(`${api}`, data);
}

export const get = (query: string|null) => {
    if(query)
        return http.get(`${api}?${query}`);
    else
        return http.get(`${api}`);
}

export const delete_ = (_id:number) => {
    return http.delete(`${api}/${_id}`);
}

export const put = (_id:any, data:object) => {
    return http.put(`${api}/${_id}`, data);
}

export default {
    post,
    get,
    delete_,
    put
}