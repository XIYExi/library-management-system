import mockjs from 'mockjs';

export default {
  'POST /mock/book/insert': mockjs.mock({
    'data|100':[
      {
        bna: '@ctitle',
        bda: '@datetime("yyyy-MM-dd")',
        bpu: '@region',
        bplA: '@string(1,2)',
        bplB: '@integer(100,200)',
        bnu: '@integer(20,30)',
      }
    ]
  })
}
