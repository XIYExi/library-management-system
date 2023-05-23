/**
 * @Description: koa中台服务器入口，原本叫app.js，但是会和dva重名，现修改为koaApp.js
 * @Author: xiye
 * @date: 2023/5/23
 */
const Koa = require('koa');
const requireDirectory = require('require-directory');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const koaApp = new Koa();

koaApp.use(bodyParser());

function initRouter(app){
  const apiDirectory =`${process.cwd()}\\koa`;
  console.log(apiDirectory)
  const modules =requireDirectory(module, apiDirectory, {
    visit:whenLoadModule
  })
  function whenLoadModule(obj) {
    if (obj instanceof Router) {
      // 路由黑名单
      const blackList = [];
      const prefix = obj.opts.prefix;
      if (!blackList.includes(prefix)) {
        app.use(obj.routes());
      }
    }
  }
}

initRouter(koaApp);

koaApp.listen(4000, () => {
  console.log('中台koa已部署，时刻监听4000端口');
})
