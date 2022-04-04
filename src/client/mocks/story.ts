import Storys from './storys/1.json';
export const storys = Storys.slice(0, 6).map((i, index) => ({
  id: index,
  ...i,
}));
