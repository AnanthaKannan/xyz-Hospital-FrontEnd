import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../config';

const url = config.apiURL;

const unAuthorizeTest: Function = (statusCode: Number): void => {
  if (statusCode === 401) {
    window.location.href = 'login';
  }
};

/** ***********
@description Used to call the GET method in http request
*************** */

export const get = (apiUrl: string, params: any = {}) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
    url: `${url}${apiUrl}`,
    params,
  };
  // console.log(options)
  return axios(options)
    .then((response) => response)
    .catch((err) => {
      console.log('err', err.response);
      if (!err.response) return { status: 500 };
      if (err && err.response) {
        unAuthorizeTest(err.response.status);
      }
      return err.response;
    });
};

/** ***********

Purpose: Used to call the POST method in http request

Parameter: {
 apiUrl: accept string (/apiName)
 data: accept Object
}

Return: Object

*************** */

export const post = (apiUrl: string, data: any) => {
  // data._hospitalId = localStorage.getItem('_hospitalId');
  console.log('===>post');
  const options: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
    data,
    url: `${url}${apiUrl}`,
  };

  return axios(options)
    .then((response) => {
      console.log('postResponse', response);
      return response;
    })
    .catch((err) => {
      console.log('err', err.response);
      if (!err.response) return { status: 500 };
      if (err && err.response) {
        unAuthorizeTest(err.response.status);
      }
      return err.response;
    });
};

/** ***********

Purpose: Used to call the PUT method in http request
Parameter: {
 apiUrl: accept string (/apiName)
 data: accept Object
}
Return: Object

*************** */

export const put = (apiUrl: string, data: any, params = {}) => {
  const urlReq = `${url}${apiUrl}`;
  const options: AxiosRequestConfig = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
    url: urlReq,
    data,
    params,
  };
  console.log(options.url);
  return axios(options)
    .then((response) => {
      console.log('putResponse', response);
      return response;
    })
    .catch((err) => {
      console.log('err', err.response);
      if (!err.response) return { status: 500 };
      if (err && err.response) {
        unAuthorizeTest(err.response.status);
      }
      return err.response;
    });
};

/** ***********

Purpose: Used to call the DELETE method in http request
Parameter: {
 apiUrl: accept string (/apiName)
 data: accept Object
}
Return: Object
*************** */

export const deleteMethod = (apiUrl: string) => {
  const qryString = `${url}${apiUrl}`;

  const options: AxiosRequestConfig = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`,
    },
    url: qryString,
  };
  console.log(options.url);
  return axios(options)
    .then((response) => {
      console.log('postResponse', response);
      return response;
    })
    .catch((err) => {
      console.log('err', err.response);
      if (!err.response) return { status: 500 };
      if (err && err.response) {
        unAuthorizeTest(err.response.status);
      }
      return err.response;
    });
};

export default {
  get,
  post,
  put,
  delete: deleteMethod,
};
