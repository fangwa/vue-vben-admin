import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { EcEnum } from '/@/api/fenghuo/enum/fenghuoEnum';
/**
 * List页面
 */
export const goodListColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '电商',
    dataIndex: 'ecType',
    sorter: true,
    width: 80,
  },
  {
    title: '商品名',
    dataIndex: 'name',
  },
  {
    title: '商品链接',
    dataIndex: 'url',
  },
  {
    title: 'UID',
    dataIndex: 'uid',
    // width: 200,
  },
  {
    title: '创建时间',
    sorter: true,
    dataIndex: 'createdTime',
    // width: 160,
  },
  {
    title: '计划数',
    dataIndex: 'goodPlanCount',
    // width: 160,
  },
];

export const goodListAction: BasicColumn = {
  width: 120,
  title: '操作',
  dataIndex: 'action',
  slots: { customRender: 'action' },
  fixed: undefined,
};

type selectOption = {
  label: string;
  value: number;
  disabled?: boolean;
};

/**
 * Edit页面
 */
export const goodEditFormSchemas: FormSchema[] = [
  {
    field: 'roiEcTypeId',
    component: 'Select',
    label: '电商',
    required: true,
    componentProps: {
      options: ((): selectOption[] => {
        //values
        let thisOptions: selectOption[] = [];
        let index = 1;
        Object.keys(EcEnum).forEach((ecEnumItem) => {
          thisOptions.push({
            label: EcEnum[ecEnumItem],
            value: index,
          });
          index++;
        });
        return thisOptions;
      })(),
    },
    colProps: { span: 24 },
  },
  {
    field: 'name',
    label: '商品名称',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  // {
  //   field: 'id',
  //   label: '商品Id',
  //   component: 'Input',
  //   show: true,
  // },
  {
    field: 'url',
    label: '商品链接',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
];
