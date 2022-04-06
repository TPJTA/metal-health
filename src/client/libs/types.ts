export interface Ariticle {
  id: number;
  title: string;
  content: string;
  cover: string;
}

export interface Testing {
  id: number;
  name: string;
  desc: string;
  type: number;
  questions: Question[];
  cover: string;
  result: resultType;
  times: number;
}

interface Question {
  id: number;
  testing: Testing;
  img?: string;
  title: string;
  answers: answerType[];
}

type answerType = {
  title: string;
  /** score[i]<= curScore < score[i+1] 则为当前答案, 按score升序排列 */
  score: number;
};

interface resultType {
  publicStr?: string;
  result: Array<{ desc: string; score: number }>;
}
