<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-space>
          <a-button pre-icon="mdi:account-box" @click="handleAuthNetease"> 授权网易 </a-button>
          <a-button pre-icon="mdi:account-box" @click="handleAuthZhihu"> 授权知乎 </a-button>
          <a-button pre-icon="mdi:account-box" @click="handleAuthUc"> 授权UC </a-button>
        </a-space>
      </template>
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
      </template> -->
      <template #accountRole="{ text: accountRole }">
        <span>{{ accountRoleName(accountRole) }} </span>
      </template>
      <template #isValid="{ text: isValid }">
        <span>
          <a-tag :color="isValid == 1 ? 'success' : 'error'">
            {{ isValid == 1 ? '有效' : '无效' }}
          </a-tag>
        </span>
      </template>
      <template #tokenExpireTime="{ text: tokenExpireTime }">
        <span>
          {{ tokenExpireTime }}
          <a-tag color="error" v-if="dateUtil().isAfter(dateUtil(tokenExpireTime))">
            {{ '过期' }}
          </a-tag>
        </span>
      </template>

      <template #enableAdvertisers="{ record, text: enableAdvertisers }">
        <a-tooltip v-if="MediaEnum.dy == record.media" placement="left">
          <template #title v-if="enableAdvertisers && enableAdvertisers.length > 0">{{
            enableAdvertisers
          }}</template>
          <a-button
            preIcon="mdi:playlist-check"
            shape="round"
            size="small"
            :color="enableAdvertisers && enableAdvertisers.length > 0 ? 'success' : 'warning'"
            @click="handleEnableAdvertisers(record)"
          />
        </a-tooltip>
      </template>

      <template #disableAdvertisers="{ record, text: disableAdvertisers }">
        <a-tooltip v-if="MediaEnum.dy == record.media" placement="left">
          <template #title v-if="disableAdvertisers && disableAdvertisers.length > 0">{{
            disableAdvertisers
          }}</template>
          <a-button
            preIcon="mdi:cancel"
            shape="round"
            size="small"
            :color="disableAdvertisers && disableAdvertisers.length > 0 ? 'error' : 'success'"
            @click="handleDisableAdvertisers(record)"
          />
        </a-tooltip>
      </template>

      <template #wbTrackActivate="{ record }">
        <a-button
          v-if="MediaEnum.wb == record.media"
          color="success"
          shape="round"
          size="small"
          @click="handleWbTrackActivate(record)"
        >
          联调
        </a-button>
      </template>
    </BasicTable>

    <DisableAdvertisersModal @register="registerModal" @success="handleDisableAdvertisersSuccess" />
    <AuthNeteaseModal @register="registerModal2" @success="handleAuthNeteaseSuccess" />
    <AuthZhihuModal @register="registerModal3" @success="handleAuthZhihuSuccess" />
    <AuthUcModal @register="registerModal5" @success="handleAuthUcSuccess" />
    <EnableAdvertisersModal @register="registerModal4" @success="handleEnableAdvertisersSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Tag, Tooltip, Space } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { formatToDateTime, dateUtil } from '/@/utils/dateUtil';

  import {
    majordomoAccountParamsListApi,
    wbAccountJointCommissioning,
  } from '/@/api/fenghuo/majordomo';
  import { majordomoAccountListColumns, searchFormSchema } from './majordomo.data';
  import DisableAdvertisersModal from './DisableAdvertisersModal.vue';
  import EnableAdvertisersModal from './EnableAdvertisersModal.vue';
  import AuthNeteaseModal from './AuthNeteaseModal.vue';
  import AuthZhihuModal from './AuthZhihuModal.vue';
  import AuthUcModal from './AuthUcModal.vue';
  import { MediaEnum } from '/@/api/fenghuo/enum/fenghuoEnum';

  export default defineComponent({
    components: {
      PageWrapper,
      [Space.name]: Space,
      [Tag.name]: Tag,
      [Tooltip.name]: Tooltip,
      BasicTable,
      TableAction,
      DisableAdvertisersModal,
      EnableAdvertisersModal,
      AuthNeteaseModal,
      AuthZhihuModal,
      AuthUcModal,
    },
    setup() {
      const { createMessage } = useMessage();

      const accountRoleName = computed(() => (accountRole: string) => {
        let tempName = '';
        switch (accountRole) {
          case 'ADVERTISER':
            tempName = '广告主';
            break;
          case 'CUSTOMER_ADMIN':
            tempName = '协作者授权的纵横组织';
            break;
          case 'CUSTOMER_OPERATOR':
            tempName = '协作者授权的纵横组织';
            break;
          case 'AGENT':
            tempName = '代理商';
            break;
          case 'CHILD_AGENT':
            tempName = '二级代理商';
            break;
          case 'PLATFORM_ROLE_STAR':
            tempName = '星图客户';
            break;
          case 'PLATFORM_ROLE_STAR_AGENT':
            tempName = '星图代理商';
            break;
        }
        return tempName;
      });

      const [registerModal, { openModal: openModal1 }] = useModal();
      const [registerModal2, { openModal: openModal2 }] = useModal();
      const [registerModal3, { openModal: openModal3 }] = useModal();
      const [registerModal4, { openModal: openModal4 }] = useModal();
      const [registerModal5, { openModal: openModal5 }] = useModal();
      const [registerTable, { reload }] = useTable({
        api: majordomoAccountParamsListApi,
        showIndexColumn: false,
        columns: majordomoAccountListColumns,
        // actionColumn: majordomoAccountListAction,
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

      async function handleWbTrackActivate(record: Recordable) {
        try {
          await wbAccountJointCommissioning(record.id);
          createMessage.info('联调成功');
        } catch (error) {
          console.log(error);
        }
      }

      function handleEnableAdvertisers(record: Recordable) {
        // console.info(record);
        openModal4(true, {
          record,
        });
      }

      function handleEnableAdvertisersSuccess(): void {
        console.info('handleEnableAdvertisersSuccess');
        reload();
      }

      function handleDisableAdvertisers(record: Recordable) {
        // console.info(record);
        openModal1(true, {
          record,
        });
      }

      function handleDisableAdvertisersSuccess(): void {
        console.info('handleDisableAdvertisersSuccess');
        reload();
      }

      function handleAuthNetease(): void {
        openModal2(true, {});
      }

      function handleAuthNeteaseSuccess(): void {
        console.info('handleAuthNeteaseSuccess');
        reload();
      }

      function handleAuthZhihu(): void {
        openModal3(true, {});
      }

      function handleAuthZhihuSuccess(): void {
        console.info('handleAuthZhihuSuccess');
        reload();
      }

      function handleAuthUc(): void {
        openModal5(true, {});
      }

      function handleAuthUcSuccess(): void {
        console.info('handleAuthUcSuccess');
        reload();
      }

      return {
        formatToDateTime,
        dateUtil,
        MediaEnum,
        registerTable,
        registerModal,
        handleReloadCurrent,
        handleDisableAdvertisers,
        handleDisableAdvertisersSuccess,
        accountRoleName,
        registerModal2,
        handleAuthNetease,
        handleAuthNeteaseSuccess,
        registerModal3,
        handleAuthZhihu,
        handleAuthZhihuSuccess,
        handleAuthUc,
        handleAuthUcSuccess,
        handleWbTrackActivate,
        registerModal5,
        registerModal4,
        handleEnableAdvertisers,
        handleEnableAdvertisersSuccess,
      };
    },
  });
</script>
