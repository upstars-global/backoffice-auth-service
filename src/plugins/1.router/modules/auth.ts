const auth = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/login/index.vue'),
    meta: {
      layout: 'full',
    },
  },
]

export default auth
