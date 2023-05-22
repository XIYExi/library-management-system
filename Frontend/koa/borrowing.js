const {back_port} = require("../constant");
const axios = require("axios");
const router = require('koa-router')();
router.prefix('/borrowing');

router.post('/insertList', async ctx => {
  let msg;
  await axios.get(back_port + '/borrowing/insertList')
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】批量添加借阅记录失败',err))
  ctx.response.body = msg;
})

router.post('/getMyBorrowing', async ctx => {
  const data = ctx.request.body;
  let msg;
  await axios.get(back_port + `/borrowing/getMyBorrowing?sno=${data.sno}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】我的借阅数据查询异常',err));
  ctx.response.body = msg;
})

router.post('/returnBook', async ctx => {
  const data = ctx.request.body;
  console.log(data)
  let msg;
  await axios.post(back_port + '/borrowing/returnBook', data)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】还书请求异常',err));
  ctx.response.body = msg;
})

router.post('/borrow', async ctx => {
  const data = ctx.request.body;
  console.log(data)
  let msg = data;
  await axios.post(back_port + '/borrowing/borrow',data)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】借书失败',err));
  ctx.response.body = msg;
})


module.exports = router;
