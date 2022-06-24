import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 1; index <= 16; index++) {
    result.push({
      Id: '@integer(100,999)',
      productId: '@integer(10000,99999)',
      productName: '@ctitle',
      adPlanId: '@id',
      adPlanName: '@ctitle',
      'status|1': ['待审核', '驳回', '作废'],
      'channel|1': ['淘宝', '京东', '拼多多'],
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/fenghuo/getCampaigns',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, demoList);
    },
  },
] as MockMethod[];
