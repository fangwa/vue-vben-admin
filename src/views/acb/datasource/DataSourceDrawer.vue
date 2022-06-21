<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';

  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataSourceEditFormSchemas } from './datasource.data';

  export default defineComponent({
    name: 'DataSourceDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: dataSourceEditFormSchemas,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        console.log(data);

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增数据源' : '编辑数据源'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(!unref(isUpdate) ? 'Add API' : 'Modify API');
          console.log(values);
          closeDrawer();
          emit('success');
        } catch (error) {
          console.log(error);
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        getTitle,
        registerDrawer,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>

<style></style>
