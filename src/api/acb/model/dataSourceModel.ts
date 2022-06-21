import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
import { BasicDataBaseModel } from '/@/api/model/baseDataBaseModel';
/**
 * @description: Request list interface parameters
 */
export type DataSourceParams = BasicPageParams;

export interface DataSourceListItem extends BasicDataBaseModel {
  /**
   * 结构
   */
  structure: string;
}

/**
 * @description: Request list return value
 */
export type DataSourceListGetResultModel = BasicFetchResult<DataSourceListItem>;
