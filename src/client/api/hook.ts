import React, { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import {
  initRequestInterceptors,
  initResponseInterceptors,
} from './interceptors';
import * as rootApi from './root';

let axiosInstance: AxiosInstance;

type apiName = keyof typeof rootApi;

export default function useApi<T extends apiName[]>(
  ...apiNames: [...T]
): { [key in T[number]]: ReturnType<typeof rootApi[key]> } {
  const router = useRouter();

  // 初始化axios
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: '/api/',
    });
    axiosInstance.interceptors.request.use(...initRequestInterceptors());
    axiosInstance.interceptors.response.use(
      ...initResponseInterceptors(router),
    );
  }

  const apiObject = useMemo(() => {
    const api: any = {};
    apiNames.forEach((i) => {
      api[i] = rootApi[i](axiosInstance);
    });
    return api;
  }, apiNames);

  return apiObject;
}
