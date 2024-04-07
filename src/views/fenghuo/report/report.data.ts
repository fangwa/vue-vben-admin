import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { dateUtil } from '/@/utils/dateUtil';
import { usePermission } from '/@/hooks/web/usePermission';
import { RoleEnum } from '/@/enums/roleEnum';
import { accountParamsListNoPageApi } from '/@/api/fenghuo/majordomo';

const { hasPermission } = usePermission();

/**
 * List页面
 */
export const reportListColumns: BasicColumn[] = [
  {
    title: '媒体',
    dataIndex: 'roiMediaType',
    width: 80,
  },
  // {
  //   title: '账号Id',
  //   dataIndex: 'adAccountId',
  // },
  {
    title: '账号名称',
    dataIndex: 'adAccountName',
    width: 80,
  },
  {
    title: '计划Id',
    dataIndex: 'adId',
    width: 100,
  },
  {
    title: '计划名称',
    dataIndex: 'adName',
    width: 120,
  },
  {
    title: '日期',
    dataIndex: 'settledTime',
    width: 90,
    format: (text: string): string => {
      return dateUtil(text).format('YYYY-MM-DD');
    },
  },
  // {
  //   title: '展示',
  //   dataIndex: 'pv',
  //   width: 80,
  // },
  // {
  //   title: '点击',
  //   dataIndex: 'click',
  //   width: 80,
  // },
  {
    title: '消耗',
    dataIndex: 'cost',
    width: 80,
  },
  {
    title: '电商',
    dataIndex: 'roiEcType',
    width: 80,
  },
  // {
  //   title: '商品Id',
  //   dataIndex: 'goodId',
  // },
  {
    title: '商品名称',
    dataIndex: 'goodName',
  },
  {
    title: '订单数',
    dataIndex: 'ecDealCount',
    width: 80,
  },
  {
    title: '成交金额',
    dataIndex: 'price',
    width: 80,
  },
  {
    title: 'ROI',
    dataIndex: 'ROI',
    width: 80,
    slots: { customRender: 'ROI' },
  },
];

export const searchFormSchema: FormSchema[] = [
  // {
  //   field: 'accountId',
  //   label: '账号Id',
  //   component: 'Input',
  //   colProps: { span: 6 },
  // },
  {
    field: 'adId',
    label: '计划Id',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      onkeyup: (e: any) => {
        // console.log(e);
        e.target.value = e.target.value.replace(/\D+/g, '');
      },
    },
  },
  // {
  //   field: 'goodId',
  //   label: '商品Id',
  //   component: 'Input',
  //   colProps: { span: 6 },
  // },
  // {
  //   field: 'channel',
  //   label: '渠道',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '淘宝', value: '1' },
  //       { label: '京东', value: '2' },
  //       { label: '拼多多', value: '3' },
  //     ],
  //   },
  //   colProps: { span: 4 },
  // },
];

/**
 * AccountList页面
 */
export const accountReportListColumns: BasicColumn[] = [
  // {
  //   title: '账号Id',
  //   dataIndex: 'adAccountId',
  // },
  {
    title: '账号名称',
    dataIndex: 'adAccountName',
  },
  {
    title: '日期',
    dataIndex: 'settledTime',
    format: (text: string): string => {
      return dateUtil(text).format('YYYY-MM-DD');
    },
  },
  {
    title: '消耗',
    dataIndex: 'cost',
  },
  {
    title: '订单数',
    dataIndex: 'ecDealCount',
  },
  {
    title: '订单gmv',
    dataIndex: 'price',
  },
  {
    title: 'ROI',
    dataIndex: 'ROI',
    slots: { customRender: 'ROI' },
  },
];

export const accountSearchFormSchema: FormSchema[] = [
  {
    field: 'groupAccount',
    label: '',
    component: 'Input',
    defaultValue: 'true',
    show: false,
    colProps: { span: 0 },
  },
  {
    field: 'adAccountId',
    label: '账号',
    component: 'ApiSelect',
    componentProps: {
      api: accountParamsListNoPageApi,
      resultField: 'items',
      labelField: 'name',
      valueField: 'accountId',
    },
    show: () => {
      return hasPermission([RoleEnum.SUPER]);
    },
    colProps: { span: 6 },
  },
  {
    field: 'settledTimeRange',
    label: '日期',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

export const goodReportListColumns: BasicColumn[] = [
  {
    title: '商品图片',
    dataIndex: 'picUrl',
    slots: { customRender: 'picUrl' },
  },
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '日期',
    dataIndex: 'settledTime',
    format: (text: string): string => {
      return dateUtil(text).format('YYYY-MM-DD');
    },
  },
  {
    title: '加购人数',
    dataIndex: 'cartUv',
  },
  {
    title: '收藏人数',
    dataIndex: 'favorUv',
  },
];

export const goodSearchFormSchema: FormSchema[] = [
  {
    field: 'settledTimeRange',
    label: '日期',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];
