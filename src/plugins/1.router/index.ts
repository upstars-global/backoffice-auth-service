import type { App } from 'vue'
import { setupLayouts } from 'virtual:generated-layouts'
import type { RouteRecordRaw } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from './additional-routes'
import { setupGuards } from '@/plugins/1.router/guards'
import { useScrollBehaviorOfRouter } from '@/helper/router'

function recursiveLayouts(route: RouteRecordRaw): RouteRecordRaw {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])

    return route
  }

  return setupLayouts([route])[0]
}

const { scrollBehavior } = useScrollBehaviorOfRouter()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior,
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
