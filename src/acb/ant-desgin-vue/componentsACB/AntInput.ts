import { IRegisterComponent, ComponentProp } from '/@/acb/acb-component-type';

class AntInput {
  // 字段
  input: IRegisterComponent;

  // 构造函数
  constructor(input: IRegisterComponent) {
    this.input = input;
  }

  // 方法
  generatorHTML(): string {
    return `<hh>
              <a-input :placeholder="${(this.input.props.placeholder as ComponentProp).value}" />
            </hh>`;
  }
}
