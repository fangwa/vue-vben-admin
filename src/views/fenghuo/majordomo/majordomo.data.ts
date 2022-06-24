import { BasicColumn } from '/@/components/Table';
/**
 * List页面
 */
export const majordomoAccountListColumns: BasicColumn[] = [
  {
    title: '账户ID',
    dataIndex: 'accountId',
    fixed: 'left',
  },
  {
    title: '账户名称',
    dataIndex: 'accountName',
  },
  {
    title: '账号角色',
    dataIndex: 'accountRole',
  },
  {
    title: '有效性',
    dataIndex: 'isValid',
    slots: { customRender: 'isValid' },
  },
  {
    title: 'Token',
    dataIndex: 'token',
  },
  {
    title: 'Token有效期',
    dataIndex: 'tokenExpireTime',
  },
  {
    title: 'RefreshToken',
    dataIndex: 'refreshToken',
  },
  {
    title: 'RefreshToken有效期',
    dataIndex: 'refreshTokenExpireTime',
  },
];

export const majordomoAccountListAction: BasicColumn = {
  width: 80,
  title: '操作',
  dataIndex: 'action',
  slots: { customRender: 'action' },
  fixed: undefined,
};
