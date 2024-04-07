<template>
  <PageWrapper title="设置">
    <a-space>
      <a-card title="巨量">
        <template #extra>
          <a-button pre-icon="mdi:content-copy" @click="handCopyDyReDirect">复制授权地址</a-button>
        </template>
        <a-list item-layout="horizontal" :data-source="settingJuLiangData">
          <template #renderItem="{ item }">
            <a-list-item> {{ item.title }} : {{ item.value }} </a-list-item>
          </template>
        </a-list>
      </a-card>

      <a-card title="磁力引擎" v-show="false">
        <template #extra>
          <a-button pre-icon="mdi:content-copy" @click="handCopyKuaishouReDirect">
            复制授权地址
          </a-button>
        </template>
        <a-list item-layout="horizontal" :data-source="settingKuaishouData">
          <template #renderItem="{ item }">
            <a-list-item> {{ item.title }} : {{ item.value }} </a-list-item>
          </template>
        </a-list>
      </a-card>

      <a-card title="微博">
        <template #extra>
          <a-button pre-icon="mdi:content-copy" @click="handCopyWeiboReDirect">
            复制授权地址
          </a-button>
        </template>
        <a-list item-layout="horizontal" :data-source="settingWeiboData">
          <template #renderItem="{ item }">
            <a-list-item> {{ item.title }} : {{ item.value }} </a-list-item>
          </template>
        </a-list>
      </a-card>
    </a-space>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { List, Card, Space } from 'ant-design-vue';

  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { MediaEnum } from '/@/api/fenghuo/enum/fenghuoEnum';

  interface DataItem {
    title: string;
    value: string;
  }

  export default defineComponent({
    components: {
      PageWrapper,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Card.name]: Card,
      [Space.name]: Space,
    },
    setup() {
      const serverDomain = 'http://www.22like.com:8080';
      const settingJuLiangData: DataItem[] = [
        {
          title: 'APP_ID',
          value: '1735878461816875',
        },
        {
          title: 'Secret',
          value: '29bf7bf22a67c37e7c18e58deb38595b5b9486bc',
        },
      ];

      const settingKuaishouData: DataItem[] = [
        {
          title: 'APP_ID',
          value: 'xxxxxxxxxxxxxxx',
        },
        {
          title: 'Secret',
          value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        },
      ];

      const settingWeiboData: DataItem[] = [
        {
          title: 'App ID',
          value: '202207141439658100',
        },
        {
          title: 'App Secret',
          value: 'f710c689994ff536308b7b0d85bd338',
        },
      ];

      //===复制url
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      const handCopyDyReDirect = () => {
        let dyKey = Object.keys(MediaEnum)[0];
        let url =
          'https://open.oceanengine.com/audit/oauth.html?app_id=1735878461816875&state=' +
          dyKey +
          '&scope=%5B130%2C4%2C5%2C2%2C14%2C112%2C110%2C120%2C122%5D&material_auth=1&redirect_uri=' +
          encodeURIComponent(serverDomain + '/jeecg-boot/roi/roiAuth/oceanengine/access_auth') +
          '&rid=fs8pe0hrqb5';
        clipboardRef.value = Date.now() + '';
        clipboardRef.value = url;
        console.log(url);
        if (unref(copiedRef)) {
          createMessage.info('复制成功！');
        }
      };

      const handCopyKuaishouReDirect = () => {
        //scope 权限说明: https://developers.e.kuaishou.com/docs?docType=DSP&documentId=1990
        //oauth_type	授权类型	oauth_type = advertiser	广告主/服务商：advertiser；代理商：agent；聚星：ad_social
        let kuaishoukey = Object.keys(MediaEnum)[1];
        let url =
          'https://ad.e.kuaishou.com/#/openapi/oauth?app_id=' +
          settingKuaishouData[0].value +
          '&scope=' +
          encodeURIComponent('["report_service","ad_query","ad_manage","account_service"]') +
          '&redirect_uri=' +
          encodeURIComponent(serverDomain + '/jeecg-boot/roi/roiAuth/kuaishou/access_auth') +
          '&state=' +
          kuaishoukey +
          '&oauth_type=advertiser';
        clipboardRef.value = Date.now() + '';
        clipboardRef.value = url;
        if (unref(copiedRef)) {
          createMessage.info('复制成功！');
        }
      };

      const handCopyWeiboReDirect = () => {
        let weiboKey = Object.keys(MediaEnum)[2];
        let url =
          'https://api.biz.weibo.com/oauth/authorize?client_id=' +
          settingWeiboData[0].value +
          '&redirect_uri=' +
          encodeURIComponent(serverDomain + '/jeecg-boot/roi/roiAuth/weibo/access_auth') +
          '&response_type=code&state=' +
          weiboKey +
          '&scope=ads_read,ads_management,ads_insight,fanstop';
        clipboardRef.value = Date.now() + '';
        clipboardRef.value = url;
        if (unref(copiedRef)) {
          createMessage.info('复制成功！');
        }
      };

      return {
        settingJuLiangData,
        settingKuaishouData,
        settingWeiboData,
        handCopyDyReDirect,
        handCopyWeiboReDirect,
        handCopyKuaishouReDirect,
      };
    },
  });
</script>
