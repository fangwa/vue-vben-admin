import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { plansTreeApi } from '../../../api/fenghuo/plans';

import { ChannelEnum } from '/@/api/fenghuo/enum/fenghuoEnum';

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

type selectOption = {
  label: string;
  value: number;
};

export const formSchema: FormSchema[] = [
  {
    colProps: {
      span: 8,
    },
    field: 'channelId',
    component: 'Select',
    label: '渠道',
    required: true,
    componentProps: {
      options: ((): selectOption[] => {
        //values
        let thisOptions: selectOption[] = [];
        Object.values(ChannelEnum).forEach((value) => {
          if (!isNaN(Number(value))) {
            thisOptions.push({
              label: ChannelEnum[value],
              value: value as number,
            });
          }
        });
        return thisOptions;
      })(),
    },
  },
  {
    colProps: {
      span: 16,
    },
    field: 'goodId',
    component: 'Input',
    label: '商品Id',
    required: true,
  },
  {
    field: '计划Id',
    component: 'ApiTreeSelect',
    label: '计划',
    required: true,
    componentProps: {
      // more details see /src/components/Form/src/components/ApiSelect.vue
      api: plansTreeApi,
      treeCheckable: true,
      // params: {
      //   id: 1,
      // },
      resultField: 'list',
      minHeight: 900,
      // use name as label
      // labelField: 'title',
      // use id as value
      // valueField: 'value',
      // not request untill to select
      // immediate: false,
      // onChange: (e) => {
      //   console.log('selected:', e);
      // },
      // atfer request callback
      // onOptionsChange: (options) => {
      //   console.log('get options', options.length, options);
      // },
    },
    colProps: {
      span: 24,
    },
  },
  // {
  //   field: 'parentMenu',
  //   label: '上级菜单',
  //   component: 'ApiTreeSelect',
  //   componentProps: {
  //     fieldNames: {
  //       label: 'menuName',
  //       key: 'id',
  //       value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  // },
];
