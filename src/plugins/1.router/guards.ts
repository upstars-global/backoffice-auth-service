import type { Router } from 'vue-router'
import { checkIsLoggedIn } from 'cardona-core-service/src/helpers/token-auth'

export const setupGuards = (router: Router) => {
  router.beforeEach(async (to, _, next) => {
    const isLoginPage = to.name === 'Login'
    const isLoggedIn = checkIsLoggedIn()

    if (isLoggedIn && isLoginPage)

      return next({ name: 'Dashboard' })

    if (!isLoggedIn && !isLoginPage)
      return next({ name: 'Login' })

    if (to.matched.isEmpty)
      return next({ name: 'Error404' })

    next()
  })
  router.afterEach(() => {
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
      appLoading.setAttribute('data-state', 'off')
      appLoading.style.display = 'none'
    }
  })
}
