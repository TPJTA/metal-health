import type { ApiType } from '../root';
import type { Ariticle } from '@/libs/types';

export const getAriticleList: ApiType<
  { data: Ariticle[]; count: number },
  [{ page?: number; size?: number; title?: string }]
> = (axios) => (params) => {
  return axios.get('/aritice/list', { params });
};

export const getAriticle: ApiType<{ data: Ariticle }, [string]> =
  (axios) => (id) => {
    return axios.get('/aritice', { params: { id } });
  };
