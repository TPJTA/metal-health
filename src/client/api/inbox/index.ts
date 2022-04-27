import type { ApiType } from '../root';

export const sentInbox: ApiType<
  { data: 'ok' },
  [email: string, content: string]
> = (axios) => (email, content) => {
  return axios.post('/inbox', { email, content });
};

export const getEmailList: ApiType<
  { data: 'ok' },
  [isAns: '0' | '1', page?: number, size?: number]
> = (axios) => (isAns, page, size) => {
  return axios.post('/inbox/list', { isAns, page, size });
};

export const sentEmail: ApiType<{ data: 'ok' }, [id: number, ans: string]> =
  (axios) => (id, ans) => {
    return axios.post('/inbox/sent', { id, ans });
  };
