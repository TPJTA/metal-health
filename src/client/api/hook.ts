import React, { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import {
  initRequestInterceptors,
  initResponseInterceptors,
} from './interceptors';
import * as rootApi from './article';

let axiosInstance: AxiosInstance;

type apiName = keyof typeof rootApi;

export default function useApi<T extends apiName>(
  apiNames: T[],
): Record<T, ReturnType<typeof rootApi[T]>> {
  const router = useRouter();

  // 初始化axios
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: 'http://localhost:3012/api/',
    });
    axiosInstance.interceptors.request.use(...initRequestInterceptors());
    axiosInstance.interceptors.response.use(
      ...initResponseInterceptors(router),
    );
  }

  const apiObject = useMemo(() => {
    const api: Record<T, ReturnType<typeof rootApi[T]>> = {} as any;
    apiNames.forEach((i) => (api[i] = rootApi[i](axiosInstance) as any));
    return api;
  }, apiNames);

  return apiObject;
}
