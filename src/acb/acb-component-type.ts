export interface IRegisterComponent {
  key?: string;
  readonly name: string;
  readonly type: string;
  readonly icon: string;
  readonly functionType: EnumComponentsFunction;
  readonly containerWidgetKey?: string;
  readonly frameType: EnumComponentsFrame;
  // darg?: {
  //   span: number;
  //   list: IRegisterComponent[];
  // }[];
  props: {
    [propname: string]: ComponentProp | EnumComponentsFunction | EnumComponentsFrame | string;
  };
}

export interface ComponentProp {
  title: string;
  type: EnumPropType;
  value?: any;
  visible?: boolean;
  valueMappingProp?: PropValueMappingProp[];
  editItems?: EditListItem[];
  templateEditItem?: any;
}

export interface PropValueMappingProp {
  enumValue: string | boolean;
  propValue: string;
}

export interface EditListItem {
  name: string;
  title: string;
  type: EnumPropType;
}

export enum EnumComponentsFunction {
  Form,
  Container,
  Other,
}

export enum EnumComponentsFrame {
  AntDesignVue,
}
export enum EnumPropType {
  Input,
  InputNumber,
  RadioButton,
  Switch,
  EditList,
}

/**
 * Radio相关
 */
export enum EnumRadioType {
  Radio = 'Radio',
  RadioButton = 'RadioButton',
}

/**
 * 数据源类型Static
 */
export enum EnumDataSourceType {
  StaticData = '静态',
  EnumData = '枚举',
  RemoteData = 'Api远端',
}

export interface IAcbComponent {
  //extends IRegisterComponent
  functionType: EnumComponentsFunction;
  frameType: EnumComponentsFrame;
  // name: string;
  // icon: string;

  templateContent: string;
  [propname: string]: any;
}
