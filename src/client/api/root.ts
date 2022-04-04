import type { AxiosInstance } from 'axios';
export * from './article';
export type ApiType<T extends Record<string, unknown>, U extends unknown[]> = (
  axios: AxiosInstance,
) => (...params: U) => Promise<T>;
