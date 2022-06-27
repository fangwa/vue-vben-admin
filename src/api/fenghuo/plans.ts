import { defHttp } from '/@/utils/http/axios';
import { selectParams } from './model/plansModel';
enum Api {
  PLANS_TREE = '/fenghuo/getPlansTree',
}

/**
 * @description: Get sample options value
 */
export const plansTreeApi = (params?: selectParams) =>
  defHttp.get<Recordable[]>({ url: Api.PLANS_TREE, params });
