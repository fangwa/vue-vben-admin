<template>
  <div v-if="selectWidget">
    <a-space direction="vertical">
      <!-- === start 组件name 显示 === -->
      <div>
        <b>{{ selectWidget.name }}</b>
      </div>
      <!-- === end 组件name 显示 === -->
      <!-- === start key 显示 === -->
      <div>Key : {{ selectWidget.key }} </div>
      <!-- === end key 显示 === -->

      <template v-if="selectWidget.props">
        <div v-for="propName in Object.keys(selectWidget.props)" :key="propName">
          <!-- === start 文本编辑属性 === -->
          <a-row
            v-if="selectWidget.props[propName].type == EnumPropType.Input"
            v-show="isPropShow(selectWidget.props[propName])"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <a-col span="6">{{ selectWidget.props[propName].title }} : </a-col>
            <a-col span="18">
              <a-input size="small" v-model:value="selectWidget.props[propName].value" />
            </a-col>
          </a-row>
          <!-- === end 文本编辑属性 === -->

          <!-- === start InputNumber编辑属性 === -->
          <a-row
            v-if="selectWidget.props[propName].type == EnumPropType.InputNumber"
            v-show="isPropShow(selectWidget.props[propName])"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <a-col span="6">{{ selectWidget.props[propName].title }} : </a-col>
            <a-col span="18">
              <a-input-number
                size="small"
                v-model:value="selectWidget.props[propName].value"
                :min="selectWidget.props[propName].min"
              />
            </a-col>
          </a-row>
          <!-- === end InputNumber编辑属性 === -->

          <!-- === start Switch属性 === -->
          <a-row
            v-if="selectWidget.props[propName].type == EnumPropType.Switch"
            v-show="isPropShow(selectWidget.props[propName])"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <a-col span="6">{{ selectWidget.props[propName].title }} : </a-col>
            <a-col span="18">
              <a-switch
                size="small"
                v-model:checked="selectWidget.props[propName].value"
                @change="handleRadioButtonGroupPropChange(selectWidget.props[propName])"
              />
            </a-col>
          </a-row>
          <!-- === end Switch属性 === -->

          <!-- === start RadioButton属性 === -->
          <a-row
            v-if="selectWidget.props[propName].type == EnumPropType.RadioButton"
            v-show="isPropShow(selectWidget.props[propName])"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <a-col span="6">{{ selectWidget.props[propName].title }} : </a-col>
            <a-col span="18">
              <a-radio-group
                v-model:value="selectWidget.props[propName].value"
                button-style="solid"
                size="small"
                @change="handleRadioButtonGroupPropChange(selectWidget.props[propName])"
              >
                <a-radio-button
                  v-for="item in Object.values(selectWidget.props[propName].source)"
                  :key="item"
                  :value="item"
                  >{{ item }}
                </a-radio-button>
              </a-radio-group>
            </a-col>
          </a-row>
          <!-- === end RadioButton属性 === -->

          <!-- === start 编辑列表属性 === -->
          <div
            v-else-if="selectWidget.props[propName].type == EnumPropType.EditList"
            v-show="isPropShow(selectWidget.props[propName])"
          >
            <a-row type="flex" justify="space-around" align="middle">
              <a-col span="16">
                {{ selectWidget.props[propName].title }} : (Count={{
                  selectWidget.props[propName].value.length
                }})
              </a-col>
              <a-col span="8">
                <a-button size="small" @click="openEditItemsModal"> 编辑 </a-button>
              </a-col>
            </a-row>
            <config-edit-items-modal
              :propData="selectWidget.props[propName]"
              @register="registerEditItemsModal"
            />
          </div>
          <!-- === end 编辑列表属性 === -->
        </div>
      </template>

      <!-- Start Test -->

      <!-- <MinusCircleOutlined /> -->
      <!-- End Test -->
    </a-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue';
  import { Row, Col, InputNumber, Radio, Space, Switch } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';

  import ConfigEditItemsModal from './ConfigEditItemsModal.vue';

  import {
    IRegisterComponent,
    EnumPropType,
    ComponentProp,
    PropValueMappingProp,
  } from '/@/acb/acb-component-type';

  export default defineComponent({
    name: 'WidgetConfig',
    components: {
      [Space.name]: Space,
      [Row.name]: Row,
      [Col.name]: Col,
      [Radio.Button.name]: Radio.Button,
      [Radio.Group.name]: Radio.Group,
      [InputNumber.name]: InputNumber,
      [Switch.name]: Switch,
      ConfigEditItemsModal,
    },
    props: {
      selector: {
        type: Object as PropType<IRegisterComponent>,
      },
    },
    setup(props) {
      const selectWidget = ref(props.selector);

      const isPropShow = computed(() => (selectWidgetPropObject: ComponentProp) => {
        return (
          selectWidgetPropObject.visible === undefined || selectWidgetPropObject.visible === true
        );
      });

      const [registerEditItemsModal, { openModal: openEditItemsModal }] = useModal();

      const handleRadioButtonGroupPropChange = (selectWidgetPropObject: ComponentProp) => {
        //设置可见和隐藏属性块
        if (
          selectWidgetPropObject.valueMappingProp &&
          selectWidgetPropObject.valueMappingProp.length > 0
        ) {
          selectWidgetPropObject.valueMappingProp.forEach((val) => {
            if (selectWidget.value) {
              (
                selectWidget.value.props[(val as PropValueMappingProp).propValue] as ComponentProp
              ).visible = (val as PropValueMappingProp).enumValue == selectWidgetPropObject.value;
            }
          });
        }
      };

      watch(
        () => props.selector,
        (newValue) => {
          selectWidget.value = newValue;
        },
      );

      return {
        EnumPropType,
        selectWidget,
        handleRadioButtonGroupPropChange,
        isPropShow,
        registerEditItemsModal,
        openEditItemsModal,
      };
    },
  });
</script>

<style lang="less"></style>
