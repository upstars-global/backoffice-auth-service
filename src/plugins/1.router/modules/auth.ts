const auth = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/auth/login/index.vue'),
    meta: {
      layout: 'full',
    },
  },
]

export default auth
