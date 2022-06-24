import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export type CampaignParams = BasicPageParams;

export interface CampaignListItem {
  Id: number;
  productId: number;
  productName: string;
  adPlanId: number;
  adPlanName: string;
  status: string;
  channel: string;
}

/**
 * @description: Request list return value
 */
export type CampaignListGetResultModel = BasicFetchResult<CampaignListItem>;
