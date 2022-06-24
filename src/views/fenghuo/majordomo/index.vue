<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-space>
          授权管理账号
          <a-button type="dashed" size="small" pre-icon="mdi:content-copy" @click="handleCopyUrl">
            复制授权地址给到客户登录授权
          </a-button>
        </a-space>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
      </template>
      <template #isValid="{ text: isValid }">
        <span>
          <a-tag :color="isValid ? 'green' : 'red'"> {{ isValid ? '有效' : '无效' }} </a-tag>
        </span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: '手动刷新Token',
              icon: 'mdi:refresh',
              onClick: handleRefreshToken.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { Space, Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { majordomoAccountParamsListApi } from '/@/api/fenghuo/majordomo';
  import { majordomoAccountListColumns, majordomoAccountListAction } from './majordomo.data';

  export default defineComponent({
    components: { PageWrapper, [Space.name]: Space, [Tag.name]: Tag, BasicTable, TableAction },
    setup() {
      //===复制url
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      const [registerTable, { reload }] = useTable({
        api: majordomoAccountParamsListApi,
        showIndexColumn: false,
        columns: majordomoAccountListColumns,
        actionColumn: majordomoAccountListAction,
        pagination: { pageSize: 10 },
      });

      const handleCopyUrl = () => {
        clipboardRef.value =
          'https://open.oceanengine.com/audit/oauth.html?app_id=1735878461816875&state=your_custom_params&scope=%5B130%2C4%2C5%2C2%2C14%2C112%2C110%2C120%2C122%5D&material_auth=1&redirect_uri=http%3A%2F%2F47.103.147.54%3A8181%2Fauth&rid=p14okd1kwja';
        if (unref(copiedRef)) {
          createMessage.info('复制成功！');
        }
      };

      function handleReloadCurrent(): void {
        reload();
      }

      function handleRefreshToken(record: Recordable) {
        console.info(record);
      }

      return { handleCopyUrl, registerTable, handleReloadCurrent, handleRefreshToken };
    },
  });
</script>
