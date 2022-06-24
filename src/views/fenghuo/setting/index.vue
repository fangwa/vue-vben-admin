<template>
  <PageWrapper title="设置">
    <a-list item-layout="horizontal" :data-source="settingData">
      <template #renderItem="{ item }">
        <a-list-item> {{ item.title }} : {{ item.value }} </a-list-item>
      </template>
    </a-list>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { List } from 'ant-design-vue';

  interface DataItem {
    title: string;
    value: string;
  }

  export default defineComponent({
    components: { PageWrapper, [List.name]: List, [List.Item.name]: List.Item },
    setup() {
      const settingData: DataItem[] = [
        {
          title: '抖音APP_ID',
          value: '1735878461816875',
        },
        {
          title: '抖音Secret',
          value: '29bf7bf22a67c37e7c18e58deb38595b5b9486bc',
        },
      ];

      return { settingData };
    },
  });
</script>
