const dashboard = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      title: 'dashboard',
      breadcrumb: [],
    },
  },
]

export default dashboard
