<template>
  <PageWrapper contentFullHeight>
    <BasicTable @register="registerTable">
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
              label: '巨量事件联调-商品购买',
              onClick: handleCopyEventUrl.bind(null, record, 'shopping'),
            },
            {
              label: '巨量事件联调-app内下单',
              onClick: handleCopyEventUrl.bind(null, record, 'in_app_order'),
            },
            {
              label: '巨量事件联调-付费',
              onClick: handleCopyEventUrl.bind(null, record, 'active_pay'),
            },
            // {
            //   label: '巨量一跳',
            //   onClick: handleCopyFirstJumpUrl.bind(null, record, 'dy'),
            // },
            {
              label: '巨量二跳',
              onClick: handleCopySecondJumpUrl.bind(null, record, 'dy'),
            },
            // {
            //   label: '微博一跳',
            //   onClick: handleCopyFirstJumpUrl.bind(null, record, 'wb'),
            // },
            {
              label: '网易一跳',
              onClick: handleCopyFirstJumpUrl.bind(null, record, 'wy'),
            },
            {
              label: '知乎一跳',
              onClick: handleCopyFirstJumpUrl.bind(null, record, 'zh'),
            },
          ]"
        />
      </template>
    </BasicTable>
    <GoodModal @register="registerModal" @success="handleCreateSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { goodListColumns, goodListAction } from './good.data';
  import GoodModal from './GoodModal.vue';
  import { goodParamsListApi } from '/@/api/fenghuo/good';

  export default defineComponent({
    components: { PageWrapper, BasicTable, TableAction, GoodModal },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        api: goodParamsListApi,
        showIndexColumn: false,
        autoCreateKey: false,
        columns: goodListColumns,
        actionColumn: goodListAction,
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

      //===复制url
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      function getJumpUrl(record: Recordable, mediaType: string, jumpType: number) {
        let param = '';
        if (jumpType == 1) {
          switch (mediaType) {
            case 'wy':
              param = '&groupid=__GROUPID__';
              break;
            case 'zh':
              param = '&cb=__CALLBACK__';
              break;
            default:
              break;
          }
        } else if (jumpType == 2) {
          switch (mediaType) {
            case 'dy':
              param = '&cidType=1';
              break;
            default:
              break;
          }
        }
        return (
          (jumpType == 1
            ? 'https://adserver.22like.com/roilanding/' + mediaType
            : 'https://ms.22like.com/hySecond.html') +
          '?amid=' +
          record.uid +
          param
        );
      }

      function handleCopyFirstJumpUrl(record: Recordable, mediaType: string) {
        clipboardRef.value = Date.now() + '';
        clipboardRef.value = getJumpUrl(record, mediaType, 1);
        if (unref(copiedRef)) {
          createMessage.info('复制成功！');
        }
      }

      function handleCopySecondJumpUrl(record: Recordable, mediaType: string) {
        clipboardRef.value = Date.now() + '';
        clipboardRef.value = getJumpUrl(record, mediaType, 2);
        if (unref(copiedRef)) {
          createMessage.info('复制成功！');
        }
      }

      function handleCopyEventUrl(record: Recordable, eventType: string) {
        clipboardRef.value = Date.now() + '';
        clipboardRef.value =
          'http://www.22like.com/jeecg-boot/roi/oceanengine/integrated?eventType=' +
          eventType +
          '&targeturl=' +
          encodeURIComponent(getFirstJumpUrl(record, 'dy'));
        if (unref(copiedRef)) {
          createMessage.info('复制成功！');
        }
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
        handleCopyFirstJumpUrl,
        handleCopySecondJumpUrl,
        handleCreateSuccess,
        handleCopyEventUrl,
      };
    },
  });
</script>
