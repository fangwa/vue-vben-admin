<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="白名单" @ok="handleSubmit">
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

  import { enableAdvertisersFormSchema } from './majordomo.data';
  import { enableAdvertisersApi } from '/@/api/fenghuo/majordomo';

  export default defineComponent({
    name: 'EnableAdvertisersModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: enableAdvertisersFormSchema,
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
          enableAdvertisersApi(values.id, values.enableAdvertisers);
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
