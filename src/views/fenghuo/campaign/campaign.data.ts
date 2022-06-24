import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

/**
 * List页面
 */
export const campaignListColumns: BasicColumn[] = [
  {
    title: '工单号',
    dataIndex: 'Id',
    fixed: 'left',
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
    title: '计划Id',
    dataIndex: 'adPlanId',
  },
  {
    title: '计划名称',
    dataIndex: 'adPlanName',
  },
  {
    title: '渠道',
    dataIndex: 'channel',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'productId',
    label: '商品Id',
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
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 4 },
  },
];
