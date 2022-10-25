import http from './http';

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

export const uploadFile = (data:{ file: any, path: string }) => {
    const formData = new FormData();
    formData.append('files', data.file);
    formData.append('path', data.path);
    return http.post(`/upload-image`, formData);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    post,
    get,
    remove,
    put,
    uploadFile
}