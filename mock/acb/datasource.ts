import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 1; index <= 1; index++) {
    result.push({
      id: index,
      name: '@cname()',
      createdTime: `@datetime('yyyy-MM-dd HH:mm:ss')`,
      lastChanged: `@datetime('yyyy-MM-dd HH:mm:ss')`,
      'status|1-2': 1,
      note: '@ctitle',
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/DSP/getDataSourceList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, demoList);
    },
  },
] as MockMethod[];
