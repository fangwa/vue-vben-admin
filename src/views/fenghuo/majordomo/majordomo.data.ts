import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { MediaEnum } from '/@/api/fenghuo/enum/fenghuoEnum';

/**
 * List页面
 */
export const majordomoAccountListColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
    fixed: 'left',
  },
  {
    title: '媒体',
    width: 70,
    dataIndex: 'media',
    fixed: 'left',
  },
  {
    title: '账户ID',
    dataIndex: 'accountId',
    fixed: 'left',
  },
  {
    title: '账户名称',
    dataIndex: 'name',
  },
  {
    title: '账号角色',
    dataIndex: 'accountRole',
    slots: { customRender: 'accountRole' },
    width: 100,
  },
  {
    title: '有效性',
    dataIndex: 'isValid',
    slots: { customRender: 'isValid' },
    width: 80,
  },
  {
    title: 'Token',
    dataIndex: 'token',
  },
  {
    title: 'Token有效期',
    dataIndex: 'tokenExpireTime',
    slots: { customRender: 'tokenExpireTime' },
  },
  {
    title: 'RefreshToken',
    dataIndex: 'refreshToken',
  },
  {
    title: 'RefreshToken有效期',
    dataIndex: 'refreshTokenExpireTime',
  },
  {
    title: '白名单(巨量)',
    dataIndex: 'enableAdvertisers',
    slots: { customRender: 'enableAdvertisers' },
    width: 80,
  },
  {
    title: '禁用名单(巨量)',
    dataIndex: 'disableAdvertisers',
    slots: { customRender: 'disableAdvertisers' },
    width: 80,
  },
  {
    title: '账户联调(微博)',
    slots: { customRender: 'wbTrackActivate' },
    width: 80,
  },
];

type selectOption = {
  label: string;
  value: number;
  disabled?: boolean;
};

export const searchFormSchema: FormSchema[] = [
  {
    field: 'mediaType',
    label: '媒体',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: ((): selectOption[] => {
        //values
        let thisOptions: selectOption[] = [];
        let index = 0;
        Object.keys(MediaEnum).forEach((ecEnumItem) => {
          console.info(ecEnumItem);
          thisOptions.push({
            label: MediaEnum[ecEnumItem],
            value: ++index,
            disabled: ecEnumItem == 'ks',
          });
          // }
        });
        return thisOptions;
      })(),
    },
  },
  {
    label: '账户ID',
    field: 'accountId',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: '账户名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 5 },
  },
];

export const majordomoAccountListAction: BasicColumn = {
  width: 80,
  title: '操作',
  dataIndex: 'action',
  slots: { customRender: 'action' },
  fixed: undefined,
};

export const enableAdvertisersFormSchema: FormSchema[] = [
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'id',
    label: 'ID',
    slot: 'customSlotId',
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'accountId',
    label: '账户ID',
    slot: 'customSlotAccountId',
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'name',
    label: '账户名称',
    slot: 'customSlotName',
  },
  {
    colProps: {
      span: 24,
    },
    field: 'enableAdvertisers',
    component: 'InputTextArea',
    label: '白名单',
    helpMessage: ['代理商不设置白名单将不同步广告主信息', '巨量填写广告主Id', 'UC填写target账户名'],
    componentProps: {
      placeholder: '多个用逗号(英文)分隔',
    },
  },
];

export const disableAdvertisersFormSchema: FormSchema[] = [
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'id',
    label: 'ID',
    slot: 'customSlotId',
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'accountId',
    label: '账户ID',
    slot: 'customSlotAccountId',
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'name',
    label: '账户名称',
    slot: 'customSlotName',
  },
  {
    colProps: {
      span: 24,
    },
    field: 'disableAdvertisers',
    component: 'InputTextArea',
    label: '禁用名单',
    componentProps: {
      placeholder: '多个用逗号(英文)分隔',
    },
  },
];

export const authNeteaseFormSchema: FormSchema[] = [
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'accountId',
    label: '广告主用户id',
    required: true,
  },
  {
    colProps: {
      span: 24,
    },
    component: 'InputPassword',
    field: 'password',
    label: '广告主用户密码',
    componentProps: {
      placeholder: '请输入密码',
      autocomplete: 'off',
    },
    required: true,
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'name',
    label: '名称',
    required: true,
  },
];

export const authZhihuFormSchema: FormSchema[] = [
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'accountId',
    label: '用户id',
    required: true,
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'token',
    label: 'token',
    required: true,
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'name',
    label: '名称',
    required: true,
  },
];

export const authUcFormSchema: FormSchema[] = [
  {
    colProps: {
      span: 24,
    },
    component: 'Select',
    field: 'accountRole',
    label: '账户类型',
    componentProps: {
      options: [
        { label: '默认普通', value: 'UC_DEFAULT', key: 'UC_DEFAULT' },
        { label: '代理商或管家', value: 'UC_AGENT', key: 'UC_AGENT' },
      ],
    },
    required: true,
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'name',
    label: '账户名',
    required: true,
  },
  {
    colProps: {
      span: 24,
    },
    component: 'InputPassword',
    field: 'password',
    label: '账户密码',
    componentProps: {
      placeholder: '请输入密码',
      autocomplete: 'off',
    },
    required: true,
  },
  {
    colProps: {
      span: 24,
    },
    component: 'Input',
    field: 'token',
    label: 'token',
    helpMessage: '开发者中心下的apiKey',
    required: true,
  },
];
