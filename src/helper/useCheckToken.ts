import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import useToastService from 'cardona-core-service/src/helpers/toasts'
import { useStorage } from '@vueuse/core'

export function useCheckToken() {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const isLoginPage = computed(() => route.name === 'Login')

  const tokenKey = ref(null)
  const getActualTokenKey = () => Object.keys(localStorage).find(key => key.includes('auth-tokens-'))
  const tokenState = ref(null)
  const { toastError } = useToastService()

  watch(() => tokenState.value, async () => {
    if (isLoginPage.value)
      return
    try {
      JSON.parse(localStorage[tokenKey.value])
    }
    catch (e) {
      toastError('TOKEN_INVALID')
      await store.dispatch('authCore/clearAuth')
      await router.push({ name: 'Login' })
    }
  }, { deep: true })

  const init = () => {
    const tokenKey = getActualTokenKey()

    tokenState.value = useStorage(tokenKey, JSON.parse(localStorage[tokenKey]))
  }

  return {
    init,
  }
}
