<script setup lang="ts">
import { transformFormData } from 'cardona-core-service/src/helpers'
import { BaseSectionSlots, PageType } from 'cardona-core-service/src/@model/templates/baseSection'
import BaseSection from 'cardona-core-service/src/components/templates/BaseSection/index.vue'
import { VColors, VSizes, VVariants } from 'cardona-core-service/src/@model/vuetify'
import type { ILoginData, LoginForm } from 'cardona-core-service/src/@model/auth'
import { useStore } from 'vuex'
import AppLogo from 'cardona-core-service/src/components/AppLogo.vue'
import { googleSdkLoaded } from 'vue3-google-login'
import type { IAuthTokens } from 'axios-jwt'
import { useAuthForm } from '@/pages/auth/useAuth'
import { googleClientIds } from '@/configs/googleAuth'
import { redirectToProject } from '@/helper'
import ApiService from 'cardona-core-service/src/services/api'
import { setAuthTokens } from 'axios-jwt'

const store = useStore()
const formRef = ref()

const isLoading = computed(() => {
  return store.getters.isLoadingEndpoint('auth')
})

const onGoogleAuth = () => {
  const locationKey = Object.keys(googleClientIds).find(key => location.origin.includes(key))
  const client_id = locationKey ? googleClientIds[locationKey] : googleClientIds.production

  googleSdkLoaded(google => {
    google.accounts.oauth2
      .initCodeClient({
        client_id,
        scope: 'openid email profile',
        ux_mode: 'redirect',
        redirect_uri: location.origin,
      })
      .requestCode()
  })
}

const login = async (authData: ILoginData) => {
  const { data }: { data: IAuthTokens } = await ApiService.request({
    type: 'App.V2.Auth',
    data: authData,
  })

  setAuthTokens(data)

  return data
}

const onSubmit = async (form: LoginForm) => {
  if (!(await formRef.value?.validate()))
    return

  const transformedForm = transformFormData(form) as ILoginData

  try {
    await login(transformedForm)
    redirectToProject()
  }
  catch {}
}
</script>

<template>
  <div class="auth-wrapper auth-v2">
    <VRow class="auth-inner mx-auto my-auto">
      <div class="align-self-center v-col-4 mx-auto">
        <VCard class="px-6 py-6 d-flex flex-column">
          <div class="brand-logo mx-auto">
            <AppLogo />
          </div>
          <VCardTitle class="mx-auto">
            {{ $t('page.login.welcomeToAdminPanel') }}
          </VCardTitle>
          <BaseSection
            ref="formRef"
            :page-type="PageType.Create"
            :use-entity="useAuthForm"
          >
            <template #default="{ form }">
              <div class="d-flex flex-column gap-4 mb-3">
                <FieldGenerator v-model="form.login" />
                <FieldGenerator v-model="form.password" />
              </div>
            </template>

            <template #[BaseSectionSlots.Actions]="{ form }: { form: LoginForm }">
              <VBtn
                :color="VColors.Primary"
                :size="VSizes.Large"
                :disabled="isLoading"
                class="full-width mt-4"
                @click="onSubmit(form)"
              >
                <VProgressCircular
                  v-if="isLoading"
                  indeterminate
                />
                <template v-else>
                  <span class="login-btn-text">
                    {{ $t('action.login') }}
                  </span>
                </template>
              </VBtn>
            </template>
          </BaseSection>

          <div class="or-separator my-6">
            {{ $t('page.login.or') }}
          </div>

          <VBtn
            :color="VColors.Secondary"
            :variant="VVariants.Outlined"
            :size="VSizes.Large"
            class="full-width"
            @click="onGoogleAuth"
          >
            <img
              class="google-logo mr-2"
              alt="google-logo"
              src="../../../assets/images/google-logo.png"
            >

            <span class="text-button">
              {{ $t('page.login.signInWithGoogle') }}
            </span>
          </VBtn>

          <VCardText class="text-center pb-0">
            <span>{{ $t('page.login.inCaseForgotPassword') }}</span>
          </VCardText>
        </VCard>
      </div>
    </VRow>
  </div>
</template>

<style lang="scss">
.auth-wrapper {
  height: 100dvh;
  display: flex;

  .login-btn-text {
    font-size: 0.9375rem;
  }

  .or-separator {
    overflow: hidden;
    display: flex;
    align-items: center;

    &:before,
    &:after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      box-sizing: border-box;
      height: 1px;
      flex: 1 1 auto;
      background: rgba(var(--v-border-color),var(--v-border-opacity));
    }
    &:before {
      margin-right: 0.5rem;
    }
    &:after {
      margin-left: 0.5rem;
    }
  }

  .google-logo {
    height: 20px;
    width: 20px;
  }
}
</style>
