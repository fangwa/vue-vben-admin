import { defHttp } from '/@/utils/http/axios';
import { GoodParams, GoodListGetResultModel } from './model/goodModel';

enum Api {
  GOOD_LIST = '/roi/roiEcGood/list',
  GOOD_LIST_NOPAGE = '/roi/roiEcGood/listNoPage',
  GOOD_ADD = '/roi/roiEcGood/add',
}

/**
 * @description: Get Goods list value
 */

export const goodParamsListApi = (params?: GoodParams) =>
  defHttp.get<GoodListGetResultModel>({
    url: Api.GOOD_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const goodParamsListNoPageApi = (params?: GoodParams) =>
  defHttp.get<GoodListGetResultModel>({
    url: Api.GOOD_LIST_NOPAGE,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const goodAdd = async (roiEcTypeId: number, name: string, url: string, uid: string) =>
  defHttp.post<String>({
    url: Api.GOOD_ADD,
    params: { roiEcTypeId, name, url, uid },
  });
