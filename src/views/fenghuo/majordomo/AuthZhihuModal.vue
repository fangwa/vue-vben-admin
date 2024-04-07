<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="知乎授权" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { authZhihuFormSchema } from './majordomo.data';
  import { authZhihu } from '/@/api/fenghuo/majordomo';

  export default defineComponent({
    name: 'AuthZhihuModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 110,
        schemas: authZhihuFormSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(() => {
        resetFields();
        setModalProps({ confirmLoading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // // TODO custom api
          await authZhihu(values.accountId, values.token, values.name, 'zh');
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
        registerModal,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>

<style></style>
