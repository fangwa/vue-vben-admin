<template>
  <PageWrapper contentFullHeight title="数据源" content="低代码所有数据结构基础来源为数据源">
    <BasicTable @register="registerTable" title="数据源Demo">
      <template #headerTop>
        <a-button type="primary" @click="handleCreate"> 创建 </a-button>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :dropDownActions="[
            {
              tooltip: '编辑',
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              tooltip: '删除',
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <DataSourceModal @register="registerModal" @success="handleCreateSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { dataSourceListColumns, dataSourceLIstAction } from './datasource.data';
  import DataSourceModal from './DataSourceModal.vue';

  import { dataSourceListApi } from '/@/api/acb/datasource';

  export default defineComponent({
    components: { PageWrapper, BasicTable, TableAction, DataSourceModal },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        api: dataSourceListApi,
        columns: dataSourceListColumns,
        actionColumn: dataSourceLIstAction,
        pagination: { pageSize: 10 },
      });

      function handleReloadCurrent(): void {
        reload();
      }

      function handleReload(): void {
        reload({
          page: 1,
        });
      }

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleCreateSuccess(): void {
        reload({
          page: 1,
        });
      }

      return {
        registerTable,
        handleReloadCurrent,
        handleReload,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleCreateSuccess,
      };
    },
  });
</script>
