import type { ApiType } from '../root';
import type { Analyse } from '@/libs/types';
export type { Analyse };
export const getAnalyse: ApiType<{ data: Analyse }, []> = (axios) => () => {
  return axios.get('/analyse');
};

export type AnalyseDetail = Array<{ times: number; createTime: number }>;
export const getAnalyseDetail: ApiType<
  { data: AnalyseDetail },
  [type: keyof Analyse]
> = (axios) => (type) => {
  return axios.get('/analyse/detail', {
    params: { type },
  });
};

export type AnalyseTesting = Array<{ type: number; sum: number }>;
export const getAnalyseTesting: ApiType<{ data: AnalyseTesting }, []> =
  (axios) => () => {
    return axios.get('/analyse/testing');
  };

export type AnalyseTestingResult = Array<{ desc: string; times: number }>;
export const getAnalyseTestingResult: ApiType<
  { data: AnalyseTestingResult },
  [id: string]
> = (axios) => (id) => {
  return axios.get('/analyse/testing/result', { params: { id } });
};
