import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { type } from 'os';
import { config } from '../config';

let url = config.apiURL;

const unAuthorizeTest: Function = (statusCode: Number): void => {
  if (statusCode === 401) {
    window.location.href = "login";
  }
}

/*************
@description Used to call the GET method in http request
****************/


export const get = (apiUrl: string, params: any = {}) => {

  let url_: string = `${url}${apiUrl}`;
  const options: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    },
    url: url_,
    params
  };
  // console.log(options)
  return axios(options)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("err", err.response);
      if (!err.response)
        return { status: 500 }
      err && err.response && unAuthorizeTest(err.response.status);
      return err.response;

    });

}




/*************

Purpose: Used to call the POST method in http request

Parameter: {
 apiUrl: accept string (/apiName)
 data: accept Object
}

Return: Object

****************/

export const post = (apiUrl: string, data: any) => {

  // data._hospitalId = localStorage.getItem('_hospitalId');
  console.log("===>post")
  const options: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    },
    data: data,
    url: `${url}${apiUrl}`,
  };

  return axios(options)
    .then(function (response) {
      console.log('postResponse', response)
      return response;
    })
    .catch(function (err) {
      console.log("err", err.response);
      if (!err.response)
        return { status: 500 }
      err && err.response && unAuthorizeTest(err.response.status);
      return err.response;
    });
}



/*************

Purpose: Used to call the PUT method in http request
Parameter: {
 apiUrl: accept string (/apiName)
 data: accept Object
}
Return: Object

****************/

export const put = (apiUrl: string, data: any, params={}) => {

  let url_ = `${url}${apiUrl}`;
  const options: AxiosRequestConfig = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    },
    url: url_,
    data: data,
    params
  };
  console.log(options.url);
  return axios(options)
    .then(function (response) {
      console.log('putResponse', response)
      return response;
    })
    .catch(function (err) {
      console.log("err", err.response);
      if (!err.response)
        return { status: 500 }
      err && err.response && unAuthorizeTest(err.response.status);
      return err.response;
    });
}



/*************

Purpose: Used to call the DELETE method in http request
Parameter: {
 apiUrl: accept string (/apiName)
 data: accept Object
}
Return: Object
****************/

export const delete_ = (apiUrl: string) => {

  let qryString = `${url}${apiUrl}`;

  const options: AxiosRequestConfig = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    },
    url: qryString
  };
  console.log(options.url)
  return axios(options)
    .then(function (response) {
      console.log('postResponse', response)
      return response;
    })
    .catch(function (err) {
      console.log("err", err.response);
      if (!err.response)
        return { status: 500 }
      err && err.response && unAuthorizeTest(err.response.status);
      return err.response;
    });
}



export default {
  get,
  post,
  put,
  delete: delete_
};