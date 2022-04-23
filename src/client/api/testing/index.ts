import type { ApiType } from '../root';
import type { Testing } from '@/libs/types';

export type TestingListType = Array<
  Pick<Testing, 'id' | 'cover' | 'desc' | 'name' | 'times' | 'type'>
>;
export const getTestingList: ApiType<
  { data: TestingListType; count: number },
  [{ page?: number; size?: number; type?: 0 | 1 | 2 | 3 }]
> = (axios) => (params) => {
  return axios.get('/testing/list', { params });
};

export type TestingType = Pick<
  Testing,
  'id' | 'desc' | 'cover' | 'name' | 'times' | 'type'
>;

export const getTesting: ApiType<{ data: TestingType }, [string]> =
  (axios) => (id) => {
    return axios.get('/testing', { params: { id } });
  };

export type TestingQustion = Pick<
  Testing,
  'questions' | 'id' | 'result' | 'times' | 'name'
>;

export const getTestingQustion: ApiType<{ data: TestingQustion }, [string]> =
  (axios) => (id) => {
    return axios.get('/testing/question', { params: { id } });
  };
