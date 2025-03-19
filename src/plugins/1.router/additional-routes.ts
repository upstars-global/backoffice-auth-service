import type { RouteRecordRaw } from 'vue-router/auto'
import auth from './modules/auth'
import dashboard from '@/plugins/1.router/modules/dashboard'

export const routes: RouteRecordRaw[] = [
  ...auth,
  ...dashboard,
]
