import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layout/index',
      routes:[
        {
          exact: true,
          path:'/borrowing',
          component: '../pages/borrowing'
        },
        {
          exact: true,
          path:'/card',
          component: '../pages/card'
        },
        {
          exact: true,
          path:'/mock',
          component: '../pages/mock'
        },
        {
          exact: true,
          path: '/book',
          component: '../pages/book'
        },
        {
          exact: true,
          path:'/user',
          component: '../pages/user'
        },
      ]
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  fastRefresh: {},
});
