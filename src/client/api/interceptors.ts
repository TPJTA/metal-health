import type { Axios } from 'axios';
import Cookies from 'js-cookie';
import type { NextRouter } from 'next/router';
type RequestInterceptors = Parameters<Axios['interceptors']['request']['use']>;
type ResponseInterceptors = Parameters<
  Axios['interceptors']['response']['use']
>;

export const initRequestInterceptors = (): RequestInterceptors => {
  return [
    function (config) {
      const token = Cookies.get('Access_Token');
      if (token) {
        (config.headers as any).authorization = 'Bearer ' + token;
      }
      return config;
    },
  ];
};

export const initResponseInterceptors = (
  router: NextRouter,
): ResponseInterceptors => {
  return [
    function (response) {
      if (response.status === 200) {
        return response.data;
      } else {
        return Promise.reject(response.data);
      }
    },
    function (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject(error);
      }
    },
  ];
};
