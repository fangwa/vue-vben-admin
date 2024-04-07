import { defHttp } from '/@/utils/http/axios';
import {
  ReportParams,
  ReportListGetResultModel,
  GoodReportListGetResultModel,
} from './model/reportModel';

enum Api {
  REPORT_LIST = '/roi/roiReport/list',
  REPORT_GOOD_LIST = '/roi/roiGoodReport/list',
}

export const reportParamsListApi = (params?: ReportParams) =>
  defHttp.get<ReportListGetResultModel>({
    url: Api.REPORT_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const goodReportParamsListApi = (params?: ReportParams) =>
  defHttp.get<GoodReportListGetResultModel>({
    url: Api.REPORT_GOOD_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
