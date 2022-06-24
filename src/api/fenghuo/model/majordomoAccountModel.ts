import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export type MajordomoAccountParams = BasicPageParams;

export interface MajordomoAccountListItem {
  accountId: number;
  accountName: string;
  accountRole: string;
  isValid: boolean;
  token: string;
  tokenExpireTime: string;
  refreshToken: string;
  refreshTokenExpireTime: string;
}

/**
 * @description: Request list return value
 */
export type MajordomoAccountListGetResultModel = BasicFetchResult<MajordomoAccountListItem>;
