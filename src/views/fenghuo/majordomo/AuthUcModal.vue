<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="UC授权" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { authUcFormSchema } from './majordomo.data';
  import { authUc } from '/@/api/fenghuo/majordomo';

  export default defineComponent({
    name: 'AuthUcModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 110,
        schemas: authUcFormSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(() => {
        console.log(111111);
        resetFields();
        setModalProps({ confirmLoading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // // TODO custom api
          await authUc(values.accountRole, values.name, values.password, values.token, 'uc');
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
