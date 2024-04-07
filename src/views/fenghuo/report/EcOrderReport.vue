<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #picUrl="{ text: picUrl }">
        <Avatar :size="60" shape="square" :src="picUrl" />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Avatar } from 'ant-design-vue';

  import { goodReportParamsListApi } from '/@/api/fenghuo/report';
  import { goodReportListColumns, goodSearchFormSchema } from './report.data';

  export default defineComponent({
    components: { PageWrapper, BasicTable, Avatar },
    setup() {
      const [registerTable, { reload }] = useTable({
        api: goodReportParamsListApi,
        showIndexColumn: false,
        columns: goodReportListColumns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 120,
          schemas: goodSearchFormSchema,
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
