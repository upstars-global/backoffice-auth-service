import type { App } from 'vue'
import { setupLayouts } from 'virtual:generated-layouts'
import type { RouteRecordRaw } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from './additional-routes'
import { setupGuards } from '@/plugins/1.router/guards'

function recursiveLayouts(route: RouteRecordRaw): RouteRecordRaw {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])

    return route
  }

  return setupLayouts([route])[0]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: () => [
    ...[
      ...routes,
    ].map(route => recursiveLayouts(route)),
  ],
})

setupGuards(router)

export { router }

export default function (app: App) {
  app.use(router)
}
