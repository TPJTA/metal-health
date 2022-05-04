import { Email } from '@/libs/types';
import type { ApiType } from '../root';
export type { Email };
export const sentInbox: ApiType<
  { data: 'ok' },
  [email: string, content: string]
> = (axios) => (email, content) => {
  return axios.post('/inbox', { email, content });
};

export const getEmailList: ApiType<
  { data: Email[]; count: number },
  [isAns: '0' | '1', page?: number, size?: number]
> = (axios) => (isAns, page, size) => {
  return axios.get('/inbox/list', {
    params: { isAns, page, size },
  });
};

export const sentEmail: ApiType<{ data: 'ok' }, [id: number, ans: string]> =
  (axios) => (id, ans) => {
    return axios.post('/inbox/sent', { id, ans });
  };
