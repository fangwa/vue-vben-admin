<template>
  <a-row :gutter="element.props.gutter.value">
    <a-col
      v-for="(col, index) in element.props.columns.value"
      :key="index"
      :span="col.span"
      class="gridCell"
    >
      <WidgetContainer :data="col.list" v-model:selector="localSelector" />
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent, defineAsyncComponent, ref, watch } from 'vue';
  import { Row, Col } from 'ant-design-vue';

  import { IRegisterComponent } from '/@/acb/acb-component-type';

  export default defineComponent({
    name: 'AntGridContainer',
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      WidgetContainer: defineAsyncComponent(
        () => import('/@/views/acb/proj-design/WidgetContainer.vue'),
      ),
    },
    props: {
      element: {
        type: Object as PropType<IRegisterComponent>,
        required: true,
      },
      selector: {
        type: Object as PropType<IRegisterComponent>,
      },
    },
    setup(props, { emit }) {
      // console.log(props.element);
      const localSelector = ref(props.selector);

      watch(
        () => props.selector,
        (newValue) => {
          localSelector.value = newValue;
        },
      );

      watch(
        localSelector,
        (newValue) => {
          emit('update:selector', newValue);
        },
        // { deep: true },
      );

      return { localSelector };
    },
  });
</script>

<style lang="less">
  .gridCell {
    // border: 2px dashed red;
    min-height: 150px;
  }
</style>
