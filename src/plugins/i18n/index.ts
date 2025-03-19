import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { cookieRef } from '@layouts/stores/config'
import en from './locales/en.json'
import { themeConfig } from '@themeConfig'

const messagesObj = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('@locale/*.json', { eager: true }))
    .map(([key, value]) => {
      return [key.replace('/node_modules/cardona-core-service/src/plugins/i18n/locales/', '').slice(0, -5), value.default]
    }),
)

let _i18n: any = null
export const getI18n = () => {
  if (_i18n === null) {
    _i18n = createI18n({
      legacy: false,
      locale: cookieRef('language', themeConfig.app.i18n.defaultLocale).value,
      fallbackLocale: 'en',
      returnObjects: true,
      messages: messagesObj,
    })
  }

  return _i18n
}
getI18n().global.mergeLocaleMessage('en', en)

export const i18n = _i18n.global
export default function (app: App) {
  app.use(getI18n())
}
