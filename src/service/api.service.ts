import services from './curd.service';
import http from './http';
import { toast } from 'react-toastify';

export const api = {
  feedback: '/feedback',
  address: '/address',
}

export const post = async (api, data) => {
  const result = await services.post(api, data);
  console.log("result", result);
  if (result.status !== 201) {
    toast.error("Oops! Something went wrong. Please try again later.");
    return { isSuccess: false, statusCode: result.status, data: null };
  }
  return { isSuccess: true, statusCode: result.status, data: result.data };
}

export const get = async (api, queryParams = {}) => {
    const result = await http.get(api, queryParams);
    console.log("result", result);
    if(result.status !== 200) {
        toast.error("Oops! Something went wrong. Please try again later.");
        return { isSuccess: false, statusCode: result.status, data: null, totalCount: null };
    }
    const totalCount = result.headers['x-total-count']
    return { isSuccess: true, statusCode: result.status, data: result.data, totalCount };
}

export const put = async (api, pathParam, data, queryParams={}) => {
  const result = await http.put(`${api}/${pathParam}`, data, queryParams={});
  console.log("result", result);
  if(result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return { isSuccess: false, statusCode: result.status, data: null };
  }
  return { isSuccess: true, statusCode: result.status, data: result.data };
}

export default  {
  post,
  get,
  put
}