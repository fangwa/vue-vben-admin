import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export type GoodParams = BasicPageParams;

export interface GoodListItem {
  Id: number;
  ecType: string;
  name: number;
  url: string;
  createdTime: string;
}

/**
 * @description: Request list return value
 */
export type GoodListGetResultModel = BasicFetchResult<GoodListItem>;
