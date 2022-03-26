import http from './http';
const api = '/time';

export const getTimeByBetween = () => {
    return http.get(`${api}/getTimeByBetween`);
}


export default {
    getTimeByBetween
}