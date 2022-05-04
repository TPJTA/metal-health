import type { AxiosInstance, AxiosResponse } from 'axios';
export * from './article';
export * from './testing';
export * from './inbox';
export * from './user';
export * from './analyse';
export type ApiType<
  T extends Record<string, unknown>,
  U extends unknown[] = [],
> = (axios: AxiosInstance) => (...params: [...U]) => Promise<T>;
