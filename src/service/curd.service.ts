import http from './http';
import { dataType } from '@type/type';

// const api = '/patientRecord';

export const post = (api, data: object) => {
    return http.post(`/${api}`, data);
}

export const get = (api, query: string|null) => {
    if(query)
        return http.get(`/${api}?${query}`);
    else
        return http.get(`/${api}`);
}

export const remove = (api, _id:number) => {
    return http.delete(`/${api}/${_id}`);
}

export const put = (api, _id:any, data:object) => {
    return http.put(`/${api}/${_id}`, data);
}

export default {
    post,
    get,
    remove,
    put
}