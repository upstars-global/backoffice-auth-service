import Vue from 'vue'

// import BootstrapVue from 'bootstrap-vue'

// 3rd party plugins
import 'cardona-core-service/src/libs/portal-vue'
import 'cardona-core-service/src/libs/toastification'

// import FeatherIcon from 'cardona-core-service/src/@core/components/feather-icon/FeatherIcon.vue'
// Vue.component(FeatherIcon.name, FeatherIcon)

import 'cardona-core-service/src/extensions'

import { config } from '@vue/test-utils'

Vue.use(BootstrapVue)
config.mocks['$t'] = (key: string) => key
