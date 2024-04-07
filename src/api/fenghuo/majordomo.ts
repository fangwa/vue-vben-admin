import { defHttp } from '/@/utils/http/axios';
import {
  MajordomoAccountParams,
  MajordomoAccountListGetResultModel,
  wbAccountJointCommissioningModel,
} from './model/majordomoAccountModel';

enum Api {
  MAJORDOMO_ACCOUNT_LIST = '/roi/system/user/page',
  ACCOUNT_LIST_NOPAGE = '/roi/roiMediaAccount/listNoPage',
  Account_DISABLE_ADVERTISERS = '/roi/roiMediaAccount/disableAdvertisers',
  Account_ENABLE_ADVERTISERS = '/roi/roiMediaAccount/enableAdvertisers',
  AUTH_NETEASE = '/roi/roiAuth/netease/access_auth',
  AUTH_ZHIHU = '/roi/roiAuth/zhihu/access_auth',
  AUTH_UC = '/roi/roiAuth/uc/access_auth',
  WEIBO_ACCOUNT_JOINT_COMMISSIONING = '/roi/wb/activate',
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

export const enableAdvertisersApi = (id: number, enableAdvertisers: string) =>
  defHttp.post<string>({
    url: Api.Account_ENABLE_ADVERTISERS,
    params: { id, enableAdvertisers },
  });

export const disableAdvertisersApi = (id: number, disableAdvertisers: string) =>
  defHttp.post<string>({
    url: Api.Account_DISABLE_ADVERTISERS,
    params: { id, disableAdvertisers },
  });

export const authNetease = async (
  accountId: number,
  password: string,
  name: string,
  state: string,
) =>
  defHttp.post<string>({
    url: Api.AUTH_NETEASE,
    params: { accountId, password, name, state },
  });

export const authZhihu = async (accountId: number, token: string, name: string, state: String) =>
  defHttp.post<string>({
    url: Api.AUTH_ZHIHU,
    params: { accountId, token, name, state },
  });

export const authUc = async (
  accountRole: string,
  name: number,
  password: string,
  token: string,
  state: string,
) =>
  defHttp.post<string>({
    url: Api.AUTH_UC,
    params: { accountRole, name, password, token, state },
  });

export const wbAccountJointCommissioning = (id: number) => {
  return defHttp.get<wbAccountJointCommissioningModel>({
    url: Api.WEIBO_ACCOUNT_JOINT_COMMISSIONING,
    params: { id },
  });
};

export const accountParamsListNoPageApi = (params?: MajordomoAccountParams) =>
  defHttp.get<MajordomoAccountListGetResultModel>({
    url: Api.ACCOUNT_LIST_NOPAGE,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
