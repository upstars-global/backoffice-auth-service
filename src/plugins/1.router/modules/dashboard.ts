const dashboard = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      layout: 'full',
    },
  },
]

export default dashboard
