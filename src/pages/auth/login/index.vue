<script setup lang="ts">
import { transformFormData } from 'cardona-core-service/src/helpers'
import type { LoginForm } from 'cardona-core-service/src/@model/auth'
import { PageType } from 'cardona-core-service/src/@model/templates/baseSection'
import BaseSection from 'cardona-core-service/src/components/templates/BaseSection/index.vue'
import { productsName } from 'cardona-core-service/src/configs/productsName'
import { VColors, VSizes } from 'cardona-core-service/src/@model/vuetify'
import { useStore } from 'vuex'
import AppLogo from 'cardona-core-service/src/components/AppLogo.vue'
import { productId } from '@productConfig'
import { useAuthForm } from '@/pages/auth/useAuth'

const router = useRouter()
const store = useStore()
const formRef = ref()

const isLoading = computed(() => {
  return store.getters.isLoadingEndpoint('auth')
})

const onSubmit = async (form: LoginForm) => {
  if (!(await formRef.value?.validate()))
    return

  const transformedForm = transformFormData(form)

  await store.dispatch('authCore/login', transformedForm)

  const products = store.getters.userProducts
  const isSameProduct = products.find(item => item.id === productId)
  if (isSameProduct) {
    await router.push({ name: 'Dashboard' })
  }
  else {
    const url = location.origin
    const hasNeocore = !!products.find(item => item.name === productsName.neocore)

    location.href = hasNeocore ? url : `${url}/${products[0].name}`
  }
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
