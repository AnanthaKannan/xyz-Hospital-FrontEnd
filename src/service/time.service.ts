import http from './http';

const api = '/time';

export const getTimeByBetween = () => http.get(`${api}/getTimeByBetween`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTimeByBetween,
};
