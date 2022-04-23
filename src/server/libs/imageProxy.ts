/**
 * @description 图片代理
 */
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

//代理配置
const proxyOption: Options = {
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
export default createProxyMiddleware(proxyOption);
