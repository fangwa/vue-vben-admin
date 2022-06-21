<template>
  <page-wrapper contentFullHeight contentBackground>
    <a-row class="dr-design">
      <a-col :span="3">
        <a-tabs size="small">
          <a-tab-pane key="1" tab="工具箱">
            <div>
              <a-radio-group v-model:value="toolsBoxShowType" button-style="solid" v-show="false">
                <a-radio-button
                  v-for="item in Object.values(AcbComponentsTypeEnum)"
                  :key="item"
                  :value="item"
                  >{{ t(`routes.acb.${item}`) }}
                </a-radio-button>
              </a-radio-group>
            </div>
            <draggable
              v-model="componentsList"
              item-key="type"
              :sort="false"
              :group="{ name: 'acbComponent', pull: 'clone', put: false }"
              :clone="cloneData"
              class="dr-modeler"
            >
              <template #item="{ element }">
                <div class="dr-module-item">
                  <icon
                    :color="
                      element.functionType == EnumComponentsFunction.Container ? 'blue' : undefined
                    "
                    :icon="element.icon"
                  />{{ element.name }}
                </div>
              </template>
            </draggable>
          </a-tab-pane>
          <!-- <a-tab-pane key="2" tab="控件结构"> 控件结构 </a-tab-pane> -->
          <a-tab-pane key="3" tab="生成代码">
            <a-button type="primary" pre-icon="mdi:codepen" size="small" @click="handleGenerator">
              生成代码
            </a-button>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :span="16">
        <widget-container v-model:data="datalist" v-model:selector="widgetFormSelect" />
      </a-col>
      <a-col :span="5">
        <a-tabs size="size">
          <a-tab-pane key="1" tab="属性">
            <widget-config v-model:selector="widgetFormSelect" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="数据结构">
            <a-space direction="vertical">
              <a-button type="primary" pre-icon="mdi:content-copy" @click="handleCopy">
                复制
              </a-button>
              <json-preview :data="datalist" />
            </a-space>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </page-wrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import Draggable from 'vuedraggable';
  import { cloneDeep } from 'lodash-es';
  import { Tabs, Row, Col, Radio, Space } from 'ant-design-vue';

  import { buildShortUUID } from '/@/utils/uuid';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import { JsonPreview } from '/@/components/CodeEditor';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';

  import componentsList from '/@/acb/ant-desgin-vue';
  import {
    IRegisterComponent,
    EnumComponentsFunction,
    ComponentProp,
  } from '/@/acb/acb-component-type';
  import { AcbComponentsTypeEnum } from './proj-design.data';
  import WidgetContainer from './WidgetContainer.vue';
  import WidgetConfig from './WidgetConfig.vue';

  export default defineComponent({
    components: {
      PageWrapper,
      [Space.name]: Space,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      [Radio.Button.name]: Radio.Button,
      [Radio.Group.name]: Radio.Group,
      [Row.name]: Row,
      [Col.name]: Col,
      Icon,
      JsonPreview,
      Draggable,
      WidgetContainer,
      WidgetConfig,
    },
    setup() {
      const { t } = useI18n();
      const toolsBoxShowType = ref<string>(AcbComponentsTypeEnum.ComponentsFunction);
      const datalist = ref<IRegisterComponent[]>([]);
      const widgetFormSelect = ref<IRegisterComponent>();

      //===复制数据
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      const handleCopy = () => {
        const datalistValue = unref(datalist);
        clipboardRef.value = JSON.stringify(datalistValue, null, 2);
        if (unref(copiedRef)) {
          createMessage.info('copy success！');
        }
      };

      const handleGenerator = (): void => {
        // const templateHtml = '';
        const datalistValue = unref(datalist);
        datalistValue.forEach((element) => {
          loadWidget(element);
        });
      };

      const loadWidget = (widget: IRegisterComponent) => {
        console.info(`${widget.name}开始`);
        if (
          widget.functionType == EnumComponentsFunction.Container &&
          widget.containerWidgetKey &&
          (widget.props[widget.containerWidgetKey] as ComponentProp).value.length > 0
        ) {
          (widget.props[widget.containerWidgetKey] as ComponentProp).value.forEach(
            (valueElement) => {
              if (valueElement.list && valueElement.list.length > 0) {
                valueElement.list.forEach((element) => {
                  loadWidget(element);
                });
              }
            },
          );
        }
        console.info(`${widget.name}结束`);
      };

      function cloneData(obj: Record<string, unknown>): Record<string, unknown> {
        const newObj = cloneDeep(obj);
        newObj.key = newObj.type + '_' + buildShortUUID();
        return newObj;
      }

      return {
        toolsBoxShowType,
        AcbComponentsTypeEnum,
        EnumComponentsFunction,
        componentsList,
        datalist,
        widgetFormSelect,
        cloneData,
        handleCopy,
        handleGenerator,
        t,
      };
    },
  });
</script>
<style lang="less">
  @import './index.less';
</style>
