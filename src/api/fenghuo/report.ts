import { defHttp } from '/@/utils/http/axios';
import { ReportParams, ReportListGetResultModel } from './model/reportModel';

enum Api {
  REPORT_LIST = '/fenghuo/getReports',
}

/**
 * @description: Get Majordomo Account list value
 */

export const reportParamsListApi = (params?: ReportParams) =>
  defHttp.get<ReportListGetResultModel>({
    url: Api.REPORT_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
