<script setup lang="ts">
import { computed } from 'vue'

// import useAppConfig from 'cardona-core-service/src/@core/app-config/useAppConfig'
import { IconsList } from 'cardona-core-service/src/@model/enums/icons'
import { i18n } from '@/plugins/i18n'
import router from '@/router'
import { dispatch, getters } from '@/store'

// const { skin } = useAppConfig()

const isDark = computed(() => skin.value === 'dark')

const iconSkin = computed(() => (isDark.value ? IconsList.SunIcon : IconsList.MoonIcon))

const textSkin = computed(() =>
  isDark.value ? i18n.t('common.mode.light') : i18n.t('common.mode.dark'),
)

const toggleSkin = () => {
  skin.value = isDark.value ? 'light' : 'dark'
}

const onClickLogout = () => {
  dispatch('authCore/clearAuth')
  router.push({ name: 'Login' })
}

const userName = computed(() => {
  return getters.userInfo?.userName || 'No name'
})

const firstLetter = computed(() => {
  return userName.value[0].toUpperCase()
})

const canViewAllAdminSection = computed(() => {
  return getters.abilityCan('backoffice-users-control', 'view')
})
</script>

<template>
  <div class="customer-menu-block">
    <div class="customer-menu align-items-center ml-auto">
      <BNavItemDropdown
        left
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-flex align-items-center overflow-hidden">
            <BAvatar
              size="40"
              :text="firstLetter"
              variant="light-success"
              badge
              class="badge-minimal mr-2 ml-50"
              badge-variant="success"
            />
            <div class="user-nav">
              <p class="user-name font-weight-bolder mb-0">
                {{ userName }}
              </p>
            </div>
          </div>
        </template>

        <template v-if="canViewAllAdminSection">
          <BDropdownItem
            link-class="d-flex align-items-center"
            :to="{ name: 'UsersControlList' }"
          >
            <FeatherIcon
              size="16"
              :icon="IconsList.CommandIcon"
              class="mr-50"
            />
            <span> {{ $t('common.adminSection._') }}</span>
          </BDropdownItem>
        </template>

        <BDropdownItem
          link-class="d-flex align-items-center"
          @click="toggleSkin"
        >
          <FeatherIcon
            size="16"
            :icon="iconSkin"
            class="mr-50"
          />
          <span>
            {{ textSkin }}
          </span>
        </BDropdownItem>

        <BDropdownDivider />

        <BDropdownItem
          link-class="d-flex align-items-center"
          @click="onClickLogout"
        >
          <FeatherIcon
            size="16"
            :icon="IconsList.LogOutIcon"
            class="mr-50"
          />
          <span>
            {{ $t('auth.logout') }}
          </span>
        </BDropdownItem>
      </BNavItemDropdown>
    </div>
  </div>
</template>

<style lang="scss">
@import 'cardona-core-service/src/@core/scss/base/bootstrap-extended/_include';
@import 'cardona-core-service/src/@core/scss/base/components/_variables-dark';

.customer-menu-block {
  .customer-menu {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9;

    background: $body-bg;
    border-top: 1px solid $border-color;
    width: 100%;
  }
  .dropdown-menu {
    top: -10px !important;
    left: 8px !important;
  }
  .dropdown-user {
    list-style: none;
    padding: 0.642rem 0.5rem;

    :after {
      content: none;
    }
  }

  .user-name {
    color: $body-color;
    &:hover {
      color: $primary;
    }
  }
}

.dark-layout {
  .customer-menu {
    background: $theme-dark-table-bg !important;
    border-top: 1px solid $theme-dark-border-color !important;

    .user-name {
      color: $theme-dark-headings-color !important;
    }
  }
}
</style>
