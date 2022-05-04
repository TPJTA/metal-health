import type { ApiType } from '../root';
import Cookies from 'js-cookie';

export const login: ApiType<
  { access_token: string },
  [{ username: string; passwoard: string }]
> = (axios) => (params) => {
  return axios
    .post<any, { access_token: string }>('/login', { ...params })
    .then((res) => {
      Cookies.set('Access_Token', res.access_token);
      return res;
    });
};
