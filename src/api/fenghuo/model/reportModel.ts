import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export type ReportParams = BasicPageParams;

export interface ReportListItem {
  accountId: number;
  accountName: string;
  productId: number;
  productName: string;
  adPlanId: number;
  adPlanName: string;
  channel: string;
  pv: number;
  click: number;
  cost: number;
  transactionAmount: number;
}

/**
 * @description: Request list return value
 */
export type ReportListGetResultModel = BasicFetchResult<ReportListItem>;
