import { deepMerge } from '@antfu/utils'
import type { App } from 'vue'
import { useI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { cookieRef } from 'cardona-core-service/src/@layouts/stores/config'
import { staticPrimaryColor, themes } from 'cardona-core-service/src/plugins/vuetify/theme'
import { getI18n } from '../../plugins/i18n'
import defaults from './defaults'
import { icons } from './icons'

// Styles
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

export default function (app: App) {
  const cookieThemeValues = {
    defaultTheme: resolveVuetifyTheme(),
    themes: {
      light: {
        colors: {
          primary: cookieRef('lightThemePrimaryColor', staticPrimaryColor).value,
        },
      },
      dark: {
        colors: {
          primary: cookieRef('darkThemePrimaryColor', staticPrimaryColor).value,
        },
      },
    },
  }

  const optionTheme = deepMerge({ themes }, cookieThemeValues)

  const vuetify = createVuetify({
    aliases: {
      IconBtn: VBtn,
    },
    defaults,
    icons,
    theme: optionTheme,
    locale: {
      adapter: createVueI18nAdapter({ i18n: getI18n(), useI18n }),
    },
  })

  app.use(vuetify)
}
