import { defHttp } from '/@/utils/http/axios';
import { DataSourceParams, DataSourceListGetResultModel } from './model/dataSourceModel';

enum Api {
  DEMO_LIST = '/DSP/getDataSourceList',
}

/**
 * @description: Get datasource list value
 */

export const dataSourceListApi = (params?: DataSourceParams) =>
  defHttp.get<DataSourceListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
