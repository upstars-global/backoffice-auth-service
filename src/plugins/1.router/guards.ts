import type { RouteLocationNormalized, Router } from 'vue-router'

const matchedUnFoundPagePath = '/:catchAll(.*)*'

const existPath = (to: RouteLocationNormalized): boolean =>
  to?.matched?.at(-1)?.path !== matchedUnFoundPagePath

export const setupGuards = (router: Router) => {
  router.beforeEach(async (to, _, next) => {
    // const isLoginPage = to.name === 'Login'
    //
    // if (!checkIsLoggedIn()) {
    //   setStorage(storageKeys.path, to.path)
    //
    //   return next({ name: 'Login' })
    // }
    //
    // if (to.path === '/') {
    //   console.log(isLoginPage)
    //
    //   return next({ name: 'Dashboard' })
    // }
    //
    // if (!existPath(to))
    //   return next({ name: 'Error404' })

    next()
  })

  router.afterEach(() => {
    document.getElementById('loading-bg')?.setAttribute('data-state', 'off')
  })
}
