const error = [
  {
    path: '/error-404',
    name: 'Error404',
    component: () => import('cardona-core-service/src/pages/[...error].vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('cardona-core-service/src/pages/error/404.vue'),
  },
]

export default error
