<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 创建 </a-button>
      </template>
    </BasicTable>

    <ECGoodLinkModal @register="registerModal" @success="handleCreateSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';

  import { campaignParamsListApi } from '/@/api/fenghuo/campaign';
  import { campaignListColumns, searchFormSchema } from './campaign.data';
  import ECGoodLinkModal from './ECGoodLinkModal.vue';

  export default defineComponent({
    components: { PageWrapper, BasicTable, ECGoodLinkModal },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        api: campaignParamsListApi,
        showIndexColumn: false,
        columns: campaignListColumns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        pagination: { pageSize: 10 },
      });

      function handleReloadCurrent(): void {
        reload();
      }

      function handleCreate() {
        //不传第二个参数,子空间不触发useModalInner回调
        openModal(true, {});
      }

      function handleCreateSuccess(): void {
        reload({
          page: 1,
        });
      }

      return {
        registerTable,
        handleReloadCurrent,
        handleCreate,
        registerModal,
        handleCreateSuccess,
      };
    },
  });
</script>
