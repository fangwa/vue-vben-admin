<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="禁用名单" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #customSlotId="{ model, field }">
        {{ model[field] }}
      </template>
      <template #customSlotAccountId="{ model, field }">
        {{ model[field] }}
      </template>
      <template #customSlotName="{ model, field }">
        {{ model[field] }}
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { disableAdvertisersFormSchema } from './majordomo.data';
  import { disableAdvertisersApi } from '/@/api/fenghuo/majordomo';

  export default defineComponent({
    name: 'DisableAdvertisersModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: disableAdvertisersFormSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        console.log(data);
        setFieldsValue({
          ...data.record,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // // TODO custom api
          disableAdvertisersApi(values.id, values.disableAdvertisers);
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
