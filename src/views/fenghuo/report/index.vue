<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #ROI="{ record }">
        <span>
          {{ record.cost > 0 ? (record.transactionAmount / record.cost).toFixed(2) : 0 }}
        </span>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';

  import { reportParamsListApi } from '/@/api/fenghuo/report';
  import { reportListColumns, searchFormSchema } from './report.data';

  export default defineComponent({
    components: { PageWrapper, BasicTable },
    setup() {
      const [registerTable, { reload }] = useTable({
        api: reportParamsListApi,
        showIndexColumn: false,
        columns: reportListColumns,
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
