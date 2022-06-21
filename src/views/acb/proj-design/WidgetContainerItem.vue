<template>
  <div> <component :is="Widget" :element="item" v-model:selector="localSelector" /></div>
</template>

<script lang="ts">
  import { defineComponent, resolveComponent, ref, watch } from 'vue';
  import { IRegisterComponent } from '/@/acb/acb-component-type';

  /**
   * Ant-Design-Vue
   */

  import AntGridContainer from '/@/acb/ant-desgin-vue/componentsACB/AntGridContainer.vue';
  import AntTabs from '/@/acb/ant-desgin-vue/componentsACB/AntTabs.vue';

  import AntInput from '/@/acb/ant-desgin-vue/componentsACB/AntInput.vue';
  import AntRadio from '/@/acb/ant-desgin-vue/componentsACB/AntRadio.vue';
  import AntCheckbox from '/@/acb/ant-desgin-vue/componentsACB/AntCheckbox.vue';

  import AntTable from '/@/acb/ant-desgin-vue/componentsACB/AntTable.vue';

  export default defineComponent({
    name: 'WidgetContainerItem',
    components: { AntGridContainer, AntTabs, AntInput, AntRadio, AntCheckbox, AntTable },
    props: {
      item: {
        type: Object as PropType<IRegisterComponent>,
        required: true,
      },
      selector: {
        type: Object as PropType<IRegisterComponent>,
      },
    },
    setup(props, { emit }) {
      // console.log('item : ', props.item, ', selector : ', props.selector);
      const localSelector = ref(props.selector);

      const Widget = resolveComponent(props.item.type);

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
      return {
        Widget,
        localSelector,
      };
    },
  });
</script>

<style></style>
