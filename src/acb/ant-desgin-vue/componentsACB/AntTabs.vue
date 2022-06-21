<template>
  <a-tabs>
    <a-tab-pane
      :tab="tabPane.title"
      v-for="tabPane in element.props.tabs.value"
      :key="tabPane.key"
      class="tabPane"
    >
      <WidgetContainer :data="tabPane.list" v-model:selector="localSelector" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent, defineAsyncComponent, ref, watch } from 'vue';
  import { Tabs } from 'ant-design-vue';

  import { IRegisterComponent } from '/@/acb/acb-component-type';

  export default defineComponent({
    name: 'AntTabs',
    components: {
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
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
  .tabPane {
    // border: 2px dashed red;
    min-height: 150px;
  }
</style>
