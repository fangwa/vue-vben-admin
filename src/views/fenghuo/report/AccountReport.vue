<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #ROI="{ record }">
        <span>
          {{ record.cost && record.cost > 0 ? (record.price / record.cost).toFixed(2) : 0 }}
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
  import { accountReportListColumns, accountSearchFormSchema } from './report.data';

  export default defineComponent({
    components: { PageWrapper, BasicTable },
    setup() {
      const [registerTable, { reload }] = useTable({
        api: reportParamsListApi,
        showIndexColumn: false,
        columns: accountReportListColumns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 120,
          schemas: accountSearchFormSchema,
          autoSubmitOnEnter: true,
        },
        showSummary: true,
        summaryFunc: handleSummary,
        pagination: { pageSize: 10 },
      });

      function handleSummary(tableData: any[]) {
        let totalCost = 0;
        let totalGmv = 0;
        let totalEcDealCount = 0;
        tableData.forEach((item) => {
          totalEcDealCount += isNaN(item.ecDealCount) ? 0 : item.ecDealCount;
          totalCost += isNaN(item.cost) ? 0 : item.cost;
          totalGmv += isNaN(item.price) ? 0 : item.price;
        });
        return [
          {
            adAccountName: '总计',
            cost: totalCost,
            price: totalGmv,
            ecDealCount: totalEcDealCount,
            ROI: totalCost == 0 ? 0 : (totalGmv / totalCost).toFixed(2),
          },
        ];
      }

      function handleReloadCurrent(): void {
        reload();
      }

      return { registerTable, handleReloadCurrent };
    },
  });
</script>
