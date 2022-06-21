import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const acb: AppRouteModule = {
  path: '/acb',
  name: 'ACB',
  component: LAYOUT,
  redirect: '/acb/datasource',
  meta: {
    orderNo: 11,
    icon: 'ion:add-circle',
    title: t('routes.acb.lowcode'),
  },
  children: [
    {
      path: 'datasource',
      name: 'DataSource',
      component: () => import('/@/views/acb/datasource/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.acb.datasource'),
      },
    },
    {
      path: 'projdesign',
      name: 'ProjDesign',
      component: () => import('/@/views/acb/proj-design/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.acb.projdesign'),
      },
    },
  ],
};

export default acb;
