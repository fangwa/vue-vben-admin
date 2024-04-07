import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 1; index <= 26; index++) {
    result.push({
      Id: index,
      accountId: '@integer(100000000,900000000)',
      name: '@cname()',
      'accountRole|1': [
        '广告主',
        '管理员授权的纵横组织',
        '协作者授权的纵横组织',
        '代理商',
        '二级代理商',
        '星图客户',
        '星图代理商',
      ],
      token: /[a-z\d]{40}/,
      'isValid|3-1': true,
      tokenExpireTime: '@datetime',
      refreshToken: /[a-z\d]{40}/,
      refreshTokenExpireTime: '@datetime',
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/system/user/page',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, demoList);
    },
  },
] as MockMethod[];
