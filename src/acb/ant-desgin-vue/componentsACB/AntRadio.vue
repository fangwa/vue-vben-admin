<template>
  <div>
    {{ element.props.label.value }}
    <a-radio-group
      :value="element.props.defaultValue.value"
      :option-type="isRadioButton ? 'button' : 'default'"
      :buttonStyle="isRadioButton ? 'solid' : undefined"
    >
      <template v-if="element.props.dataSource.value == EnumDataSourceType.StaticData">
        <component
          v-for="staticItem in element.props.dataSourceItems.value"
          :is="radioTypeTag"
          :key="staticItem.key"
          :value="staticItem.value"
        >
          {{ staticItem.label }}
        </component>
      </template>
      <template v-else-if="element.props.dataSource.value == EnumDataSourceType.EnumData">
        <component :is="radioTypeTag" value="-1">
          [{{ element.props.dataSourceEnumData.value }}]
        </component>
      </template>
      <template v-else-if="element.props.dataSource.value == EnumDataSourceType.RemoteData">
        <component :is="radioTypeTag" value="-1">
          [{{ element.props.dataSourceRemoteData.value }}]
        </component>
      </template>
    </a-radio-group>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { Radio } from 'ant-design-vue';

  import {
    IRegisterComponent,
    EnumRadioType,
    EnumDataSourceType,
    ComponentProp,
  } from '/@/acb/acb-component-type';

  export default defineComponent({
    components: {
      [Radio.name]: Radio,
      [Radio.Button.name]: Radio.Button,
      [Radio.Group.name]: Radio.Group,
    },
    props: {
      element: {
        type: Object as PropType<IRegisterComponent>,
        required: true,
      },
    },
    setup(props) {
      // 计算属性:激活的组件
      const isRadioButton = computed(() => {
        return EnumRadioType.RadioButton == (props.element.props.radioType as ComponentProp).value;
      });

      const radioTypeTag = computed(() => {
        return isRadioButton.value ? 'a-radio-button' : 'a-radio';
      });

      const dataSource = ref((props.element.props.dataSourceItems as ComponentProp).value);

      // watch(
      //   [
      //     () => (props.element.props.dataSource as ComponentProp).value,
      //     () => (props.element.props.dataSourceEnumData as ComponentProp).value,
      //     () => (props.element.props.dataSourceRemoteData as ComponentProp).value,
      //   ],
      //   (newValue) => {
      //     switch (newValue[0]) {
      //       case EnumDataSourceType.StaticData:
      //         dataSource.value = (props.element.props.dataSourceItems as ComponentProp).value;
      //         break;
      //       case EnumDataSourceType.EnumData:
      //         dataSource.value = [
      //           {
      //             label: `[${(props.element.props.dataSourceEnumData as ComponentProp).value}]`,
      //             value: '0',
      //           },
      //         ];
      //         break;
      //       case EnumDataSourceType.RemoteData:
      //         dataSource.value = [
      //           {
      //             label: `[${(props.element.props.dataSourceRemoteData as ComponentProp).value}]`,
      //             value: '0',
      //           },
      //         ];
      //         break;
      //     }
      //   },
      // );
      return { EnumRadioType, EnumDataSourceType, isRadioButton, radioTypeTag, dataSource };
    },
  });
</script>

<style></style>
