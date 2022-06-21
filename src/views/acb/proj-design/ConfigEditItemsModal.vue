<template>
  <BasicModal
    v-bind="$attrs"
    :title="localPropData.title + '(Count = ' + localPropData.value.length + ')'"
    :showOkBtn="false"
    cancelText="关闭"
  >
    <draggable
      :list="localPropData.value"
      group="configEditItems"
      item-key="key"
      handle=".dr-mover"
    >
      <template #item="{ element, index }">
        <a-row class="edit-row" type="flex" justify="space-around" align="middle">
          <a-col span="12"><appstore-filled class="dr-mover" /> : {{ index }}</a-col>
          <a-col span="12">
            <minus-circle-outlined :style="{ color: 'red' }" @click="removeEditListItem(index)" />
          </a-col>

          <template
            v-for="(editItemProp, editItemPropIndex) in localPropData.editItems"
            :key="editItemPropIndex"
          >
            <a-col span="3"> {{ editItemProp.title }} : </a-col>

            <a-col span="20">
              <!-- Edit的 Input -->
              <a-input
                size="small"
                v-if="editItemProp.type == EnumPropType.Input"
                v-model:value="element[editItemProp.name]"
              />

              <!-- Edit的 InputNumber -->
              <input-number
                size="small"
                v-if="editItemProp.type == EnumPropType.InputNumber"
                v-model:value="element[editItemProp.name]"
              />
            </a-col>
          </template>
        </a-row>
      </template>
      <template #footer>
        <a-button size="small" type="dashed" @click="addEditListItem">
          <plus-outlined />
          添加
        </a-button>
      </template>
    </draggable>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import Draggable from 'vuedraggable';
  import { Row, Col, InputNumber } from 'ant-design-vue';
  import { MinusCircleOutlined, PlusOutlined, AppstoreFilled } from '@ant-design/icons-vue';
  import { BasicModal } from '/@/components/Modal';
  import { cloneDeepWith } from 'lodash-es';
  import { buildShortUUID } from '/@/utils/uuid';

  import { ComponentProp, EnumPropType } from '/@/acb/acb-component-type';

  export default defineComponent({
    name: 'ConfigEditItemsModal',
    components: {
      BasicModal,
      [Row.name]: Row,
      [Col.name]: Col,
      Draggable,
      InputNumber,
      MinusCircleOutlined,
      PlusOutlined,
      AppstoreFilled,
    },
    props: {
      propData: {
        type: Object as PropType<ComponentProp>,
      },
    },
    setup(props) {
      // console.log('init: ', props.propData);

      const localPropData = ref(props.propData);

      const removeEditListItem = (editListItemIndex: number): void => {
        // console.log(editListItemIndex);
        if (
          localPropData.value &&
          localPropData.value.value &&
          localPropData.value.value.length > editListItemIndex
        ) {
          localPropData.value.value.splice(editListItemIndex, 1);
        }
      };

      const addEditListItem = (): void => {
        if (localPropData.value && localPropData.value.templateEditItem) {
          const clonedTemplateEditItem = cloneDeepWith(
            localPropData.value.templateEditItem,
            (valueParam, keyParam) => {
              if (keyParam === 'key' && typeof valueParam === 'string') {
                return `${valueParam.split('_')[0]}_${buildShortUUID()}`;
              }
            },
          );
          localPropData.value.value.push(clonedTemplateEditItem);
        }
      };

      watch(
        () => props.propData,
        (newValue) => {
          console.log('ConfigEditItemsModal props.propData watch changed..', newValue);
          localPropData.value = newValue;
        },
      );

      return { EnumPropType, localPropData, addEditListItem, removeEditListItem };
    },
  });
</script>
<style lang="less">
  .dr-mover {
    cursor: move;
  }

  .edit-row {
    border: thin dotted #ff0000;
    margin: 4px;
  }
</style>
