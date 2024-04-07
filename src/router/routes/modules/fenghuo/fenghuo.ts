import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
import { t } from '/@/hooks/web/useI18n';

const fenghuo: AppRouteModule = {
  path: '/fenghuo',
  name: 'Fenghuo',
  component: LAYOUT,
  redirect: '/fenghuo/majordomo',
  meta: {
    orderNo: 12,
    icon: 'ion:add-circle',
    title: t('routes.fenghuo.Hyperlinkverse'),
  },
  children: [
    {
      path: 'majordomo',
      name: 'Majordomo',
      component: () => import('/@/views/fenghuo/majordomo/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.majordomoAccoutManage'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'good',
      name: 'Good',
      component: () => import('/@/views/fenghuo/good/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.goodManage'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'campaign',
      name: 'Campaign',
      component: () => import('/@/views/fenghuo/campaign/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.campaignManage'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'accountReport',
      name: 'AccountReport',
      component: () => import('/@/views/fenghuo/report/AccountReport.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.accountReport'),
        roles: [RoleEnum.SUPER, RoleEnum.TEST],
      },
    },
    {
      path: 'goodReport',
      name: 'GoodReport',
      component: () => import('/@/views/fenghuo/report/GoodReport.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.goodReport'),
        roles: [RoleEnum.SUPER, RoleEnum.TEST],
      },
    },
    // {
    //   path: 'orderReport',
    //   name: 'OrderReport',
    //   component: () => import('/@/views/fenghuo/report/EcOrderReport.vue'),
    //   meta: {
    //     // affix: true,
    //     title: t('routes.fenghuo.orderReport'),
    //     roles: [RoleEnum.SUPER, RoleEnum.TEST],
    //   },
    // },
    {
      path: 'report',
      name: 'Report',
      component: () => import('/@/views/fenghuo/report/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.adReport'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('/@/views/fenghuo/setting/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.fenghuo.setting'),
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default fenghuo;
