const router = require('koa-router')();
const { back_port } = require('../constant');
const axios = require('axios');

router.prefix('/book');

router.post('/insert',async ctx => {
  const data = ctx.request.body;
  const list = [];
  data.map(item => {
    const json = {
      bna: '《' + item.bna + '》',
      bda: item.bda,
      bpu: item.bpu + '出版社',
      bpl: item.bplA + '-' + item.bplB,
      bnu: item.bnu,
    }
    list.push(json);
  })
  let msg;
  await axios.post(back_port + '/book/insert',list)
    .then(res => {
      //console.log(res.data)
      msg = res.data;
    })
    .catch(err => console.log('后端请求错误', err));
  ctx.response.body = msg;
})


router.post('/listByPage', async ctx => {
  const data = ctx.request.body;
  /**
   * data:{
   *   current: 1,
   *   limit: 20
   * }
   */
  let msg;
  await axios.get(back_port + `/book/list/${data.current}/${data.limit}`)
    .then(res => {
      const {list} = res.data.data;
      msg = list;
    })
    .catch(err => console.log('分页查询图书错误', err))
  ctx.response.body = msg;
})

router.post('/updateById',async ctx => {
  const data = ctx.request.body;
  //console.log(data);
  let msg;
  await axios.post(back_port + '/book/updateById', data)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('更新图书错误', err))

  ctx.response.body = msg;
})

router.post('/deleteById', async ctx => {
  const data = ctx.request.body;
  let msg;
  await axios.post(back_port + `/book/deleteById?id=${data.id}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('删除图书错误', err))
  ctx.response.body = msg;
})


router.post('/searchTitle', async ctx => {
  const data = ctx.request.body;
  let msg;
  await axios.post(back_port + `/book/searchTitle?bna=${data.title}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('书名模糊查询错误',err))
  ctx.response.body = msg;
})


router.post('/insertManuel', async ctx => {
  const data = ctx.request.body;
  let msg;
  await axios.post(back_port + '/book/insertManuel', data)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('添加图书失败', err))
  ctx.response.body = msg;
})


router.post('/selectBookForStu', async ctx => {
  let msg;
  await axios.get(back_port + '/book/selectBookForStu')
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】学生页面请求图书列表异',err));
  ctx.response.body = msg;
})

router.post('/searchById', async ctx => {
  const data = ctx.request.body;
  let msg;
  await axios.post(back_port + `/book/searchById?id=${data.id}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】根据id搜索图书错误',err));
  ctx.response.body = msg;
})


module.exports = router;
