const router = require('koa-router')();
const { back_port } = require('../constant');
const axios = require('axios');

router.prefix('/user');

router.post('/insert', async ctx => {
  const data = ctx.request.body;//获取列表
  //console.log(ctx.request.body)

  // 按照参数规范封装学生信息
  const list = [];
  data.map(item => {
    const json = {
      sna: item.name,
      sde: item.sde,
      ssp: (item.ssp === 1 && '计算机科学与技术') || (item.ssp === 2 && '数字媒体技术') || '人工智能',
      pwd: '123456', // 密码统一初始化为 123456
      sno: '0',
      type: 1,
      sup: 10,
    };
    list.push(json);
  })

  // console.log(list);
  let msg;
  await axios.post(back_port + '/user/insert', list)
    .then(res => {
      console.log(res.data)
     msg = res.data;
    })
    .catch(err => console.log(err));
  ctx.response.body = msg;
})


router.post(`/snaSearch`, async ctx=>{
  const data = ctx.request.body;
  let msg;
  await axios.get(back_port + `/user/selectBySna?sna=${data.sna}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err=>console.log('【中台】模糊查询学生姓名异常',err));
  ctx.response.body = msg;
})

router.post('/list', async ctx => {
  let msg;
  await axios.get(back_port + '/user/list')
    .then(response => {
      const {list} = response.data.data;
      msg = list;
    })
    .catch(err => console.log('【中台】查询学生用户列表失败',err))
  ctx.response.body = msg;
})





module.exports = router;
