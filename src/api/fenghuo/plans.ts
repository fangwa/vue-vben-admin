import { defHttp } from '/@/utils/http/axios';
import { selectParams } from './model/plansModel';
enum Api {
  PLANS_TREE = '/roi/roiMediaAd/tree',
  GOODS_TREE = '/roi/roiEcGood/tree',
}

/**
 * @description: Get sample options value
 */
export const plansTreeApi = (params?: selectParams) =>
  defHttp.get<Recordable[]>({ url: Api.PLANS_TREE, params });

/**
 * @description: Get sample options value
 */
export const goodsTreeApi = (params?: selectParams) =>
  defHttp.get<Recordable[]>({ url: Api.GOODS_TREE, params });
