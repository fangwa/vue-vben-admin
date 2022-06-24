import { defHttp } from '/@/utils/http/axios';
import {
  MajordomoAccountParams,
  MajordomoAccountListGetResultModel,
} from './model/majordomoAccountModel';

enum Api {
  MAJORDOMO_ACCOUNT_LIST = '/fenghuo/getMajordomoAccounts',
}

/**
 * @description: Get Majordomo Account list value
 */

export const majordomoAccountParamsListApi = (params?: MajordomoAccountParams) =>
  defHttp.get<MajordomoAccountListGetResultModel>({
    url: Api.MAJORDOMO_ACCOUNT_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
