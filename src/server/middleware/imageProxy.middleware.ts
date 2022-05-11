/**
 * @description 图片代理
 */
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

//代理配置
const xmcsProxyOption: Options = {
  target: 'https://res.xmcs.cn',
  changeOrigin: true,
  pathRewrite: {
    '^/xmcs': '/',
  },
  secure: false,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('referer', 'https://www.xmcs.cn/');
  },
};
const xinliProxyOption: Options = {
  target: 'https://ossimg.xinli001.com',
  changeOrigin: true,
  pathRewrite: {
    '^/xinli/img': '/',
  },
  secure: false,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('referer', 'https://www.xinli001.com/');
  },
};
export const xmcsProxy = createProxyMiddleware(xmcsProxyOption);
export const xinliProxy = createProxyMiddleware(xinliProxyOption);
