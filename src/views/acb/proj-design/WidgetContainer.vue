<template>
  <div class="dr-viewer">
    <draggable
      :class="{ 'dr-container': true, 'dr-empty': localData && localData.length === 0 }"
      handle=".dr-mover"
      ghostClass="dr-placeholder"
      :list="localData"
      group="acbComponent"
      item-key="key"
    >
      <template #item="{ element, index }">
        <div
          :class="{
            'dr-area': true,
            mask: element.functionType != EnumComponentsFunction.Container,
            'dr-active': selectedDrActive(element),
          }"
          style="margin: 2px"
          @click.stop="handleSelectWidget(index)"
        >
          <icon
            icon="mdi:drag"
            title="拖动"
            class="dr-mover icon-rank"
            v-if="selectedDrActive(element)"
          />
          <icon
            icon="mdi:content-copy"
            title="复制"
            class="icon-document-copy"
            v-if="selectedDrActive(element)"
            @click="handleWidgetClone(index)"
          />
          <icon
            icon="mdi:delete-off"
            title="删除"
            class="icon-close"
            v-if="selectedDrActive(element)"
            @click="handleWidgetDelete(index)"
          />
          <widget-container-item
            :item="element"
            v-if="isContainerComponent(element)"
            v-model:selector="localSelector"
          />
          <widget-container-item :item="element" v-else />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue';
  import Draggable from 'vuedraggable';
  import { Icon } from '/@/components/Icon';
  import { cloneDeepWith } from 'lodash-es';

  import { buildShortUUID } from '/@/utils/uuid';

  import WidgetContainerItem from './WidgetContainerItem.vue';
  import { IRegisterComponent, EnumComponentsFunction } from '/@/acb/acb-component-type';

  export default defineComponent({
    name: 'WidgetContainer',
    components: { Draggable, WidgetContainerItem, Icon },
    props: {
      data: {
        type: Array as PropType<IRegisterComponent[]>,
        required: true,
      },
      selector: {
        type: Object as PropType<IRegisterComponent>,
      },
    },
    setup(props, { emit }) {
      const localData = ref(props.data);
      const localSelector = ref(props.selector);

      const isContainerComponent = computed(() => (widgetItem: IRegisterComponent) => {
        return widgetItem.functionType == EnumComponentsFunction.Container;
      });

      // 计算属性:激活的组件
      const selectedDrActive = computed(() => (widgetItem: IRegisterComponent) => {
        return localSelector.value && localSelector.value?.key === widgetItem.key;
      });

      function handleSelectWidget(index: number): void {
        localSelector.value = localData.value[index];
      }

      function handleWidgetClone(index: number): void {
        const clonedWdiget = cloneDeepWith(localData.value[index], (valueParam, keyParam) => {
          if (keyParam === 'key' && typeof valueParam === 'string') {
            return `${valueParam.split('_')[0]}_${buildShortUUID()}`;
          }
        });
        localData.value.splice(index, 0, clonedWdiget);
      }

      function handleWidgetDelete(index: number): void {
        localData.value.splice(index, 1);
      }

      watch(
        () => props.data,
        () => {
          localData.value = props.data;
        },
      );

      watch(localData, () => {
        emit('update:data', localData);
      });

      watch(
        () => props.selector,
        () => {
          localSelector.value = props.selector;
        },
      );
      watch(
        localSelector,
        (newValue) => {
          emit('update:selector', newValue);
        },
        // { deep: true },
      );

      return {
        EnumComponentsFunction,
        localData,
        localSelector,
        isContainerComponent,
        selectedDrActive,
        handleSelectWidget,
        handleWidgetClone,
        handleWidgetDelete,
      };
    },
  });
</script>
