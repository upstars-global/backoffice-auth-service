import type { RouteRecordRaw } from 'vue-router/auto'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import error from './modules/error'

export const routes: RouteRecordRaw[] = [
  ...auth,
  ...dashboard,
  ...error,
]
