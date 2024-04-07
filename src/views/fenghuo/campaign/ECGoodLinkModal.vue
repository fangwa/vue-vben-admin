<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :defaultFullscreen="true"
    title="工单绑定"
    @ok="handleSubmit"
    :minHeight="350"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { campaignAdd } from '/@/api/fenghuo/campaign';
  import { formSchema } from './campaign.data';

  export default defineComponent({
    name: 'ECGoodLinkModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          console.info(values);
          // if (!isUrl(values.shopUrl)) {
          //   createMessage.error('商品链接不合法,请输入正确的链接!');
          //   return false;
          // }
          setModalProps({ confirmLoading: true });
          console.info('submit...');
          await campaignAdd(values.roiGoodId, values.planId);
          closeModal();
          emit('success');
        } catch (error) {
          console.log(error);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      // function IsURL(str_url) {
      //   var strRegex =
      //     '^((https|http|ftp|rtsp|mms)?://)' +
      //     "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
      //     '(([0-9]{1,3}\.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
      //     '|' + // 允许IP和DOMAIN（域名）
      //     "([0-9a-z_!~*'()-]+\.)*" + // 域名- www.
      //     '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' + // 二级域名
      //     '[a-z]{2,6})' + // first level domain- .com or .museum
      //     '(:[0-9]{1,4})?' + // 端口- :80
      //     '((/?)|' + // a slash isn't required if there is no file name
      //     "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
      //   var re = new RegExp(strRegex);
      //   //re.test()
      //   if (re.test(str_url)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>
