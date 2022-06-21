import {
  IRegisterComponent,
  EnumComponentsFunction,
  EnumComponentsFrame,
  EnumPropType,
  EnumDataSourceType,
  EnumRadioType,
} from '../acb-component-type';

import { buildShortUUID } from '/@/utils/uuid';

export default <IRegisterComponent[]>[
  {
    name: 'Grid栅格',
    type: 'AntGridContainer',
    icon: 'mdi:grid',
    functionType: EnumComponentsFunction.Container,
    containerWidgetKey: 'columns',
    frameType: EnumComponentsFrame.AntDesignVue,
    props: {
      gutter: { title: '栅格间隔', type: EnumPropType.InputNumber, value: 0, min: 0 },
      columns: {
        title: '列信息',
        type: EnumPropType.EditList,
        editItems: [{ name: 'span', title: '宽度', type: EnumPropType.InputNumber }],
        templateEditItem: { key: `AntGridCol_${buildShortUUID()}`, span: 8, list: [] },
        value: [
          {
            key: `AntGridCol_${buildShortUUID()}`,
            span: 8,
            list: [],
          },
          {
            key: `AntGridCol_${buildShortUUID()}`,
            span: 8,
            list: [],
          },
          {
            key: `AntGridCol_${buildShortUUID()}`,
            span: 8,
            list: [],
          },
        ],
      },
    },
  },
  {
    name: 'Tab',
    type: 'AntTabs',
    icon: 'mdi:tab',
    functionType: EnumComponentsFunction.Container,
    containerWidgetKey: 'tabs',
    frameType: EnumComponentsFrame.AntDesignVue,
    props: {
      tabs: {
        title: '选项卡',
        type: EnumPropType.EditList,
        editItems: [{ name: 'title', title: '标题', type: EnumPropType.Input }],
        templateEditItem: { key: `AntGridCol_${buildShortUUID()}`, title: 'tab', list: [] },
        value: [
          {
            key: `AntTabPane_${buildShortUUID()}`,
            title: 'tab',
            list: [],
          },
        ],
      },
    },
  },
  {
    name: '输入框',
    type: 'AntInput',
    icon: 'mdi:pencil',
    functionType: EnumComponentsFunction.Form,
    frameType: EnumComponentsFrame.AntDesignVue,
    props: {
      label: {
        title: '标签',
        type: EnumPropType.Input,
        value: '默认标签',
      },
      placeholder: {
        title: '提示',
        type: EnumPropType.Input,
        value: '请输入',
      },
      textarea: {
        title: '多行',
        type: EnumPropType.Switch,
        value: false,
        valueMappingProp: [
          {
            enumValue: true,
            propValue: 'rowcount',
          },
        ],
      },
      rowcount: {
        title: '行数',
        type: EnumPropType.InputNumber,
        min: 2,
        value: 4,
        visible: false,
      },
    },
  },
  {
    name: '单选框',
    type: 'AntRadio',
    icon: 'mdi:radiobox-marked',
    functionType: EnumComponentsFunction.Form,
    frameType: EnumComponentsFrame.AntDesignVue,
    props: {
      label: {
        title: '标签',
        type: EnumPropType.Input,
        value: '默认标签',
      },
      defaultValue: {
        title: '默认值',
        type: EnumPropType.Input,
        value: '',
      },
      radioType: {
        title: 'Radio类型',
        type: EnumPropType.RadioButton,
        source: EnumRadioType,
        value: EnumRadioType.Radio,
      },
      dataSource: {
        title: '数据源',
        type: EnumPropType.RadioButton,
        source: EnumDataSourceType,
        value: EnumDataSourceType.StaticData,
        valueMappingProp: [
          {
            enumValue: EnumDataSourceType.StaticData,
            propValue: 'dataSourceItems',
          },
          {
            enumValue: EnumDataSourceType.EnumData,
            propValue: 'dataSourceEnumData',
          },
          {
            enumValue: EnumDataSourceType.RemoteData,
            propValue: 'dataSourceRemoteData',
          },
        ],
      },
      dataSourceEnumData: {
        title: '枚举',
        type: EnumPropType.Input,
        value: '选择枚举',
        visible: false,
      },
      dataSourceRemoteData: {
        title: 'api地址',
        type: EnumPropType.Input,
        value: 'http://xxx',
        visible: false,
      },
      dataSourceItems: {
        title: '数据集合',
        type: EnumPropType.EditList,
        visible: true,
        editItems: [
          { name: 'label', title: '标签', type: EnumPropType.Input },
          { name: 'value', title: '值', type: EnumPropType.Input },
        ],
        templateEditItem: { key: `AntRadioItem_${buildShortUUID()}`, label: '选项x', value: 0 },
        value: [
          {
            key: `AntRadioItem_${buildShortUUID()}`,
            label: '选项A',
            value: '0',
          },
          {
            key: `AntRadioItem_${buildShortUUID()}`,
            label: '选项B',
            value: '1',
          },
          {
            key: `AntRadioItem_${buildShortUUID()}`,
            label: '选项C',
            value: '2',
          },
        ],
      },
    },
  },
  {
    name: '复选框',
    type: 'AntCheckbox',
    icon: 'mdi:checkbox-marked',
    functionType: EnumComponentsFunction.Form,
    frameType: EnumComponentsFrame.AntDesignVue,
    props: {
      label: {
        title: '标签',
        type: EnumPropType.Input,
        value: '默认标签',
      },
    },
  },
  {
    name: '表格',
    type: 'AntTable',
    icon: 'mdi:table',
    functionType: EnumComponentsFunction.Other,
    frameType: EnumComponentsFrame.AntDesignVue,
    props: {
      title: {
        title: '标题',
        type: EnumPropType.Input,
        value: '标题',
      },
      titleHelpMessage: {
        title: '标题提醒',
        type: EnumPropType.Input,
        value: '',
      },
      showIndexColumn: {
        title: '序号列',
        type: EnumPropType.Switch,
        value: false,
      },
      pageSize: {
        title: 'PageSize',
        type: EnumPropType.InputNumber,
        value: 10,
        min: 1,
      },
      columns: {
        title: '表格列',
        type: EnumPropType.EditList,
        editItems: [
          { name: 'dataIndex', title: 'dataIndex', type: EnumPropType.Input },
          { name: 'title', title: '列名', type: EnumPropType.Input },
        ],
        templateEditItem: {
          key: `AntTableCol_${buildShortUUID()}`,
          dataIndex: 'newDataIndex',
          title: '列名X',
        },
        value: [
          { key: `AntTableCol_${buildShortUUID()}`, dataIndex: 'id', title: 'Id' },
          { key: `AntTableCol_${buildShortUUID()}`, dataIndex: 'name', title: '名称' },
        ],
      },
    },
  },
];
