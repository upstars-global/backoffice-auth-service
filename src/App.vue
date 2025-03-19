<script setup lang="ts">
import { watch } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { useStore } from 'vuex'
import ScrollToTop from 'cardona-core-service/src/@core/components/ScrollToTop.vue'
import initCore from 'cardona-core-service/src/@core/initCore'
import { initConfigStore, useConfigStore } from 'cardona-core-service/src/@core/stores/config'
import { hexToRgb } from 'cardona-core-service/src/@layouts/utils'
import { useCustomScroll } from 'cardona-core-service/src/use/useCustomScroll'
import WSService from 'cardona-core-service/src/services/ws'
import { useCheckToken } from 'cardona-core-service/src/use/useCheckToken'
import { Channel } from '@/configs/wsConfig'

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()
useCustomScroll()
useCheckToken()

const store = useStore()
const configStore = useConfigStore()
const { name } = useDisplay()

watch(
  () => store.getters['authCore/isAuthorizedUser'],
  async isLogin => {
    if (isLogin)
      await WSService.connect(Channel)

    else await WSService.disconnect()
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp
      :class="name"
      :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`"
    >
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
