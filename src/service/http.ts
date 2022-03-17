import { config } from '@config/config';
import axios from 'axios';
import { type } from 'os';

const url = config.apiURL;

const unAuthorizeTest: Function = (statusCode: Number): void => {
  if(statusCode === 401){
    window.location.href = "login";
  }
}

  /*************
  @description Used to call the GET method in http request
  ****************/

  type GET = (apiUrl: string, data: object|null) => Promise<any>;

  export const get: GET = (apiUrl: string, data = null) => {
    let qryString:string = `${url}${apiUrl}`;
    if (data !== null) {
      const keys:string[] = Object.keys(data);
      keys.forEach((key:string, i:number) => qryString += `${i===0 ? '?' : '&'}${key}=${data[key]}`)
    }

  

    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-access-token': `${ sessionStorage.getItem('token')}`
      },
      url: qryString
    };
    // console.log(options)
    return axios(options)
      .then(function (response) {
        return response;
      })
      .catch(function (err) {
        console.log("err", err.response);
        if(!err.response)
          return { status: 500 }
        err && err.response && unAuthorizeTest(err.response.status);
        return err.response;

      });

  }