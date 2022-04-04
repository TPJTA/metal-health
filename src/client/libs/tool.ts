import { convert } from 'html-to-text';
/** 将html转换为text */
export const HTMLToText = (html: string) => {
  return convert(html, {
    wordwrap: null,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
    ],
    preserveNewlines: true,
    limits: {
      ellipsis: '',
      maxInputLength: 1000,
    },
  }).replace(/(\>)|\n/g, '');
};
