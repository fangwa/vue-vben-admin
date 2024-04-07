import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { plansTreeApi, goodsTreeApi } from '../../../api/fenghuo/plans';
import { goodParamsListNoPageApi } from '/@/api/fenghuo/good';

/**
 * List页面
 */
export const campaignListColumns: BasicColumn[] = [
  {
    title: '工单号',
    dataIndex: 'id',
    fixed: 'left',
    width: 80,
  },
  {
    title: '渠道',
    dataIndex: 'channel',
    width: 90,
  },
  // {
  //   title: '商品Id',
  //   dataIndex: 'goodId',
  //   width: 120,
  // },
  {
    title: '商品名称',
    dataIndex: 'goodName',
    width: 140,
  },
  // {
  //   title: '落地页',
  //   dataIndex: 'externalUrlWithUuid',
  //   slots: { customRender: 'externalUrlWithUuid' },
  // },
  {
    title: '商品链接',
    dataIndex: 'url',
  },
  {
    title: '媒体',
    dataIndex: 'mediaType',
    width: 90,
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
    title: '绑定时间',
    dataIndex: 'createdTime',
  },
  {
    title: '状态',
    dataIndex: 'adStatus',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roiGoodId',
    label: '商品',
    colProps: { span: 6 },
    component: 'ApiSelect',
    componentProps: {
      api: goodParamsListNoPageApi,
      resultField: 'items',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'adPlanId',
    label: '计划Id',
    component: 'Input',
    colProps: { span: 6 },
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '停用', value: '1' },
  //     ],
  //   },
  //   colProps: { span: 4 },
  // },
];

export const formSchema: FormSchema[] = [
  // {
  //   colProps: {
  //     span: 8,
  //   },
  //   field: 'ecType',
  //   component: 'Select',
  //   label: '电商',
  //   required: true,
  //   componentProps: {
  //     options: ((): selectOption[] => {
  //       //values
  //       let thisOptions: selectOption[] = [];
  //       Object.keys(EcEnum).forEach((ecEnumItem) => {
  //         thisOptions.push({
  //           label: EcEnum[ecEnumItem],
  //           value: ecEnumItem,
  //           // disabled: ecEnumItem == 'tb',
  //         });
  //         // }
  //       });
  //       return thisOptions;
  //     })(),
  //   },
  // },
  // {
  //   colProps: {
  //     span: 16,
  //   },
  //   field: 'goodType',
  //   required: true,
  //   component: 'RadioGroup',
  //   label: '绑定类型',
  //   componentProps: {
  //     defaultValue: 2,
  //     // disabled: true,
  //     options: [
  //       {
  //         label: '商品Id',
  //         value: 1,
  //         disabled: true,
  //       },
  //       {
  //         label: '商品链接',
  //         value: 2,
  //       },
  //     ],
  //   },
  // },
  // {
  //   colProps: {
  //     span: 24,
  //   },
  //   field: 'goodId',
  //   component: 'Input',
  //   label: '商品Id',
  //   ifShow: ({ values }) => {
  //     return values.goodType == 1;
  //   },
  //   dynamicRules: ({ values }) => {
  //     return values.goodType == 1 ? [{ required: true }] : [];
  //   },
  // },
  // {
  //   colProps: {
  //     span: 24,
  //   },
  //   field: 'shopUrl',
  //   component: 'Input',
  //   label: '商品链接',
  //   ifShow: ({ values }) => {
  //     return values.goodType == 2;
  //   },
  //   dynamicRules: ({ values }) => {
  //     return values.goodType == 2 ? [{ required: true }] : [];
  //   },
  // },
  {
    field: 'roiGoodId',
    component: 'ApiTreeSelect',
    label: '商品',
    required: true,
    componentProps: {
      // more details see /src/components/Form/src/components/ApiSelect.vue
      api: goodsTreeApi,
      // params: {
      //   id: 1,
      // },
      resultField: 'list',
      minHeight: 900,
      treeNodeFilterProp: 'title',
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'planId',
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
      treeNodeFilterProp: 'title',
    },
    colProps: {
      span: 24,
    },
  },
];
