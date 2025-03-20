import type { RouteRecordRaw } from 'vue-router/auto'
import auth from './modules/auth'
import error from './modules/error'

export const routes: RouteRecordRaw[] = [
  ...auth,
  ...error,
]
