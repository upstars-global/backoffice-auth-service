<script>

// import LayoutVerticalAdminSection from 'cardona-core-service/src/@core/layouts/layout-vertical/LayoutVerticalAdminSection.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    LayoutVerticalAdminSection,
    Navbar,
  },
  data() {
    return {}
  },
}
</script>

<template>
  <LayoutVerticalAdminSection>
    <RouterView />

    <template #navbar="{ toggleVerticalMenuActive }">
      <Navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>
  </LayoutVerticalAdminSection>
</template>
