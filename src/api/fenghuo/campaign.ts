import { defHttp } from '/@/utils/http/axios';
import { CampaignParams, CampaignListGetResultModel } from './model/campaignModel';

enum Api {
  CAMPAIGN_LIST = '/fenghuo/getCampaigns',
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
