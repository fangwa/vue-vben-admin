<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataSourceEditFormSchemas } from './datasource.data';

  export default defineComponent({
    name: 'DataSourceModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: dataSourceEditFormSchemas,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });

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
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(!unref(isUpdate) ? 'Add API' : 'Modify API');
          console.log(values);
          closeModal();
          emit('success');
        } catch (error) {
          console.log(error);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        getTitle,
        registerModal,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>

<style></style>
