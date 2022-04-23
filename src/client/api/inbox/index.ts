import type { ApiType } from '../root';

export const sentInbox: ApiType<
  { data: 'ok' },
  [email: string, content: string]
> = (axios) => (email, content) => {
  return axios.post('/inbox', { email, content });
};
