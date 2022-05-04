import type { ApiType } from '../root';
import type { Ariticle } from '@/libs/types';

export const getAriticleList: ApiType<
  { data: Ariticle[]; count: number },
  [{ page?: number; size?: number; title?: string }]
> =
  (axios) =>
  (params = {}) => {
    return axios.get('/aritice/list', { params });
  };

export const getAriticle: ApiType<{ data: Ariticle }, [string]> =
  (axios) => (id) => {
    return axios.get('/aritice', { params: { id } });
  };

export const addAriticle: ApiType<
  { data: Ariticle },
  [title: string, content: string, cover: File]
> = (axios) => (title, content, cover) => {
  const formDate = new FormData();
  formDate.append('title', title);
  formDate.append('content', content);
  formDate.append('cover', cover);
  return axios.post('/aritice', formDate);
};

export const updateAriticle: ApiType<
  { data: Ariticle },
  [
    id: string,
    updateParam: {
      title?: string;
      content?: string;
      cover?: File;
    },
  ]
> = (axios) => (id, updateParam) => {
  const formDate = new FormData();
  formDate.append('id', id);
  for (const i in updateParam) {
    formDate.append(i, (<any>updateParam)[i]);
  }
  return axios.put('/aritice', formDate);
};

export const removeeAriticle: ApiType<{ data: Ariticle }, [id: string]> =
  (axios) => (id) => {
    return axios.delete('/aritice', {
      data: { id },
    });
  };
