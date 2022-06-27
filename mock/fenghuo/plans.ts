import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const demoPlansTreeList = (keyword) => {
  const result = {
    list: [] as Recordable[],
  };
  for (let index = 0; index < 2; index++) {
    const children: Recordable[] = [];
    for (let j = 0; j < 10; j++) {
      children.push({
        title: `${keyword ?? ''}${['抖音', '快手'][index]}-计划${j}(Id:${index}-${j})`,
        value: `${index}-${j}`,
      });
    }
    result.list.push({
      title: `${keyword ?? ''}${['抖音', '快手'][index]}`,
      value: `${index}`,
      key: `${index}`,
      selectable: false,
      children,
    });
  }
  return result;
};

export default [
  {
    url: '/basic-api/fenghuo/getPlansTree',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword } = query;
      console.log(keyword);
      return resultSuccess(demoPlansTreeList(keyword));
    },
  },
] as MockMethod[];
