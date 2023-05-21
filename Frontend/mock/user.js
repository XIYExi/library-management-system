import mockjs from 'mockjs';

export default {
  'POST /mock/user/insert':mockjs.mock({
    success: true,
    'data|40': [{
      name: '@cname',
      sde: '人工智能与计算机',
      /**
       * 1 - 计科
       * 2 - 数媒
       * 3 - 人工智能
       */
      ssp: '@integer(1,3)',
    }]
  }),

  'POST /mock/user/insert10': (req, res) => {
    res.send(mockjs.mock({
      status: 0,
      success: true,
      'data|10': [{
        name: '@cname',
        sde: '人工智能与计算机',
        /**
         * 1 - 计科
         * 2 - 数媒
         * 3 - 人工智能
         */
        ssp: '@integer(1,3)',
      }]
    }))
  },
}
