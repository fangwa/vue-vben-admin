import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 1; index <= 16; index++) {
    result.push({
      accountId: '@integer(100000000,900000000)',
      accountName: '@cname()',
      productId: '@integer(10000,99999)',
      productName: '@ctitle',
      adPlanId: '@id',
      adPlanName: '@ctitle',
      'channel|1': ['淘宝', '京东', '拼多多'],
      pv: '@integer(1000,9999)',
      click: '@integer(0,500)',
      'cost|200-500.2': 1,
      'transactionAmount|0-9999.2': 1,
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/fenghuo/getReports',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, demoList);
    },
  },
] as MockMethod[];
