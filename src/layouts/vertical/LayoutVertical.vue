<script>

// import LayoutVertical from 'cardona-core-service/src/@core/layouts/layout-vertical/LayoutVertical.vue'
import CustomMenu from '../components/CustomMenu.vue'
import MobileMenu from '@/layouts/components/MobileMenu'

export default {
  components: {
    MobileMenu,
    LayoutVertical,
    CustomMenu,
  },
  data() {
    return {
      // showCustomizer: $themeConfig.layout.customizer,
    }
  },
}
</script>

<template>
  <LayoutVertical>
    <RouterView />

    <template #navbar="{ toggleVerticalMenuActive }">
      <MobileMenu :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>

    <!--
      <app-customizer
      v-if="showCustomizer"
      slot="customizer"
      />
    -->
    <template #vertical-menu-footer>
      <CustomMenu />
    </template>
  </LayoutVertical>
</template>
