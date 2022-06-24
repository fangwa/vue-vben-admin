<template>
  <PageWrapper>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';

  import { campaignParamsListApi } from '/@/api/fenghuo/campaign';
  import { campaignListColumns, searchFormSchema } from './campaign.data';

  export default defineComponent({
    components: { PageWrapper, BasicTable },
    setup() {
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

      return { registerTable, handleReloadCurrent };
    },
  });
</script>
