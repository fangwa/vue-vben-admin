import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
/**
 * List页面
 */
export const dataSourceListColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
  },
  {
    title: '数据源名',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '状态',
    sorter: true,
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    sorter: true,
    dataIndex: 'createdTime',
  },
  {
    title: '修改时间',
    sorter: true,
    dataIndex: 'lastChanged',
  },
  {
    title: '备注',
    sorter: true,
    dataIndex: 'note',
  },
];

export const dataSourceLIstAction: BasicColumn = {
  width: 80,
  title: '操作',
  dataIndex: 'action',
  slots: { customRender: 'action' },
  fixed: undefined,
};

/**
 * Edit页面
 */
export const dataSourceEditFormSchemas: FormSchema[] = [
  {
    field: 'id',
    label: '数据源Id',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'name',
    label: '数据源名称',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
    colProps: { span: 12 },
  },
  {
    field: 'note',
    label: '备注',
    component: 'InputTextArea',
  },
];
