import { defineConfig } from 'umi';
import routes from './routes'

export default defineConfig({
  proxy: {
    '/noa': {
      'target': 'http://192.168.5.66:3032/',
      'changeOrigin': true,
    },
    '/api': {
      'target': 'http://192.168.5.66:3032/',
      'changeOrigin': true,
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: { loading: '@/components/loading/index' },
  routes: [
    {
      exact: false, path: '/', component: '@/layouts/index',
      routes: [
        { title: '登录', path: '/login', name: 'login', component: '@/pages/login/login'},
        ...routes
      ],
    },
  ],
});
