<template>
  <div>
    {{ element.props.label.value }}
    <component
      :is="inputType"
      :placeholder="element.props.placeholder.value"
      :rows="element.props.rowcount.value"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { IRegisterComponent, ComponentProp } from '/@/acb/acb-component-type';

  export default defineComponent({
    props: {
      element: {
        type: Object as PropType<IRegisterComponent>,
        required: true,
      },
    },
    setup(props) {
      const inputType = computed(() => {
        return (props.element.props.textarea as ComponentProp).value ? 'a-textarea' : 'a-input';
      });

      return { inputType };
    },
  });
</script>

<style></style>
