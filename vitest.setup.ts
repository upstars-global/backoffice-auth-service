import { vi } from 'vitest'
import { config } from '@vue/test-utils'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { currency } from 'cardona-core-service/src/directives/currency'
import { dayDateDirective, fullDateDirective, fullDateWithSecondsDirective } from 'cardona-core-service/src/directives/date'
import { getI18n } from './src/plugins/i18n'

// import { getI18n } from './src/plugins/i18n'
import 'cardona-core-service/src/extensions/index'

const projectDirective = {
  'day-date': dayDateDirective,
  'full-date': fullDateDirective,
  'full-date-with-seconds': fullDateWithSecondsDirective,
  'currency': currency,
}

// vue-flatpickr-component
export const vuetify = createVuetify({
  components,

  directives: {
    ...directives,
    ...projectDirective,
  },
})

vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))

vi.mock('./src/helpers/clipboard', () => ({
  copyToClipboard: vi.fn(),
}))

config.global.plugins = [vuetify, getI18n()]

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
