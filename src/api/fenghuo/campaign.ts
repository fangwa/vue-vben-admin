import { defHttp } from '/@/utils/http/axios';
import { CampaignParams, CampaignListGetResultModel } from './model/campaignModel';

enum Api {
  CAMPAIGN_LIST = '/roi/roiAdplanGood/list',
  CAMPAIGN_ADD = '/roi/roiAdplanGood/addBatch',
}

/**
 * @description: Get Campaign list value
 */

export const campaignParamsListApi = (params?: CampaignParams) =>
  defHttp.get<CampaignListGetResultModel>({
    url: Api.CAMPAIGN_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const campaignAdd = async (roiGoodId: number, adPlanId: string[]) =>
  defHttp.post<String>({
    url: Api.CAMPAIGN_ADD,
    params: { roiGoodId, adPlanId },
    timeout: 20000,
  });
