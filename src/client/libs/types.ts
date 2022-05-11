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
  score: number;
};

export interface Email {
  id: number;
  email: string;
  content: string;
  ans?: string;
}

type AnalyseItemType = {
  num: number;
  rate: number;
};
export interface Analyse {
  visite: AnalyseItemType;
  testing: AnalyseItemType;
  question: AnalyseItemType;
}
