import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

/**
 * List页面
 */
export const reportListColumns: BasicColumn[] = [
  {
    title: '账号Id',
    dataIndex: 'accountId',
  },
  {
    title: '账号名称',
    dataIndex: 'accountName',
  },
  {
    title: '计划Id',
    dataIndex: 'adPlanId',
  },
  {
    title: '计划名称',
    dataIndex: 'adPlanName',
  },
  {
    title: '商品Id',
    dataIndex: 'productId',
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
  },

  {
    title: '渠道',
    dataIndex: 'channel',
  },
  {
    title: '展示',
    dataIndex: 'pv',
  },
  {
    title: '点击',
    dataIndex: 'click',
  },
  {
    title: '消耗',
    dataIndex: 'cost',
  },
  {
    title: '订单金额',
    dataIndex: 'transactionAmount',
  },
  {
    title: 'ROI',
    dataIndex: 'ROI',
    slots: { customRender: 'ROI' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'accountId',
    label: '账号Id',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'adPlanId',
    label: '计划Id',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'productId',
    label: '商品Id',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'channel',
    label: '渠道',
    component: 'Select',
    componentProps: {
      options: [
        { label: '淘宝', value: '1' },
        { label: '京东', value: '2' },
        { label: '拼多多', value: '3' },
      ],
    },
    colProps: { span: 4 },
  },
];
