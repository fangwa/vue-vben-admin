import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const fenghuo: AppRouteModule = {
  path: '/fenghuo',
  name: 'Fenghuo',
  component: LAYOUT,
  redirect: '/fenghuo/majordomo',
  meta: {
    orderNo: 12,
    icon: 'ion:add-circle',
    title: t('烽火'),
  },
  children: [
    {
      path: 'majordomo',
      name: 'Majordomo',
      component: () => import('/@/views/fenghuo/majordomo/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.majordomoAccoutManage'),
      },
    },
    {
      path: 'campaign',
      name: 'Campaign',
      component: () => import('/@/views/fenghuo/campaign/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.campaignManage'),
      },
    },
    {
      path: 'report',
      name: 'Report',
      component: () => import('/@/views/fenghuo/report/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.report'),
      },
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('/@/views/fenghuo/setting/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.setting'),
      },
    },
  ],
};

export default fenghuo;
