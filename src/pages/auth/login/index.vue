<script setup lang="ts">
import { transformFormData } from 'cardona-core-service/src/helpers'
import type { ILoginData, LoginForm } from 'cardona-core-service/src/@model/auth'
import { PageType } from 'cardona-core-service/src/@model/templates/baseSection'
import BaseSection from 'cardona-core-service/src/components/templates/BaseSection/index.vue'
import { VColors, VSizes } from 'cardona-core-service/src/@model/vuetify'
import { useStore } from 'vuex'
import type { IAuthTokens } from 'axios-jwt'
import { setAuthTokens } from 'axios-jwt'

import ApiService from 'cardona-core-service/src/services/api'
import { useAuthForm } from '@/pages/auth/useAuth'
import { redirectToProject } from '@/helper'

const store = useStore()
const formRef = ref()

const isLoading = computed(() => {
  return store.getters.isLoadingEndpoint('auth')
})

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
          <div class="pb-4">
            <h3 class="text-primary text-uppercase text-center">
              Authorization service
            </h3>
          </div>
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

            <template #actions="{ form }">
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
                  {{ $t('action.login') }}
                </template>
              </VBtn>
            </template>
          </BaseSection>
          <VCardText class="text-center mt-2 pb-0">
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
}
</style>
