import type { ApiType } from '../root';
import type { Testing } from '@/libs/types';
export { Testing };

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
  'questions' | 'id' | 'times' | 'name'
>;

export const getTestingQustion: ApiType<{ data: TestingQustion }, [string]> =
  (axios) => (id) => {
    return axios.get('/testing/question', { params: { id } });
  };

export const getTestRes: ApiType<
  {
    data: { resultStr: string; result: string };
  },
  [id: string, score: number]
> = (axios) => (id, score) => {
  return axios.get('/testing/result', {
    params: { id, score },
  });
};

export type AllTesting = Testing & {
  results: Array<{ desc: string; id: number; score: number }>;
};

export const getTestingAllList: ApiType<
  { data: AllTesting[]; count: number },
  [{ page?: number; size?: number; type?: 0 | 1 | 2 | 3 }]
> = (axios) => (params) => {
  return axios.get('/testing/allList', { params });
};

export type AddQuestions = {
  img: string;
  title: string;
  answers: Array<{ title: string; score: number }>;
};

export type AddResultType = { desc: string; score: number };

export type AddTestingType = {
  name: string;
  desc: string;
  type: number;
  questions: AddQuestions[];
  cover: string;
  resultStr: string;
  results: AddResultType[];
};

export const addTesting: ApiType<
  {
    data: 'ok';
  },
  [param: AddTestingType]
> = (axios) => (param) => {
  return axios.post('/testing', param);
};

export const removeTesting: ApiType<
  {
    data: 'ok';
  },
  [id: number]
> = (axios) => (id) => {
  return axios.delete('/testing', { data: { id } });
};

export const addTestingQuestion: ApiType<
  {
    data: 'ok';
  },
  [id: number, question: AddQuestions]
> = (axios) => (id, question) => {
  return axios.post('/testing/question', { id, question });
};

export const removeTestingQuestion: ApiType<
  {
    data: 'ok';
  },
  [id: number]
> = (axios) => (id) => {
  return axios.delete('/testing/question', { data: { id } });
};

export const updateTesting: ApiType<
  {
    data: 'ok';
  },
  [id: number, param: Partial<Omit<AddTestingType, 'questions'>>]
> = (axios) => (id, param) => {
  return axios.put('/testing', { id, ...param });
};
