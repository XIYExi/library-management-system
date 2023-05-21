const axios = require('axios');
const router = require('koa-router')();
const {back_port} = require("../constant");
const uuid = require('../utils/tool');

router.prefix('/card');


router.post('/insert', async ctx => {
  const data = ctx.request.body;
  // 按照参数规范封装学生信息
  const list = [];
  data.map(item => {
    const json = {
      sna: item.name,
      sde: item.sde,
      ssp: (item.ssp === 1 && '计算机科学与技术') || (item.ssp === 2 && '数字媒体技术') || '人工智能',
      pwd: '123456', // 密码统一初始化为 123456
      sno: uuid(4,10),
      type: 1,
      sup: 10,
    };
    list.push(json);
  })

  let msg;
  await axios.post(back_port + '/card/insert', list)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('批量生成会员卡错误',err))
  ctx.response.body = msg;
})


router.post('/findAll', async ctx => {
  const data = ctx.request.body;
  let msg;
  await axios.get(back_port + `/card/findAll/${data.current}/${data.limit}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】查询借阅卡列表异常', err))
  ctx.response.body = msg;
})

router.post('/updateLevel', async ctx => {
  const data = ctx.request.body;
  let msg;
  await axios.post(back_port + `/card/updateLevel?sno=${data.sno}&level=${data.level}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】修改借阅卡等级失败', err));
  ctx.response.body = msg;
})

router.post('/deleteBySno',async ctx => {
  const data = ctx.request.body;
  // console.log(data)
  let msg;
  await axios.post(back_port + `/card/deleteBySno?sno=${data.sno}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】删除借阅卡数据失败', err));
  ctx.response.body = msg;
})

router.post('/snaSearch', async ctx => {
  const data = ctx.request.body;
  let msg;
  await axios.get(back_port + `/card/snaSearch?sna=${data.sna}`)
    .then(response => {
      const {res} = response.data.data;
      msg = res;
    })
    .catch(err => console.log('【中台】持卡人模糊查询错误',err));
  ctx.response.body = msg;
})

router.post('/addCard', async ctx => {
  const data = ctx.request.body;
  let msg;
  const sno = uuid(4,10);
  await axios.post(back_port + `/card/addCard?id=${data.id}&sno=${sno}`)
    .then(response => {
      const {res} = response.data.data;
      console.log(res)
      msg = res;
    })
    .catch(err => console.log('【中台】开卡失败',err));
  ctx.response.body = msg;
})




module.exports = router;
