<template>
  <div class="ml-2 mt-1">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon :icon="IconsList.MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { IconsList } from 'cardona-core-service/src/@model/enums/icons'

const props = withDefaults(
  defineProps<{
    toggleVerticalMenuActive: Function
  }>(),
  {
    toggleVerticalMenuActive: () => {},
  }
)
</script>

<style lang="scss">
.header-navbar {
  min-height: 0 !important;
}
</style>
