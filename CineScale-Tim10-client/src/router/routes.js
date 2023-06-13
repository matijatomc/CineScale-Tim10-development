
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  {
    path: '/Login',
    component: () => import('layouts/LoginPageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginIndex.vue') }
    ]
  },

  {
    path: '/Register',
    component: () => import('layouts/RegisterPageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RegisterIndex.vue') }
    ]
  },

  {
    path: '/TVSeries',
    component: () => import('layouts/TVSeriesPageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TVSeriesIndex.vue') }
    ]
  },

  {
    path: '/User',
    component: () => import('layouts/UserPageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UserIndex.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
