import { createApp } from 'vue'

import 'cardona-core-service/src/@model/validations'
import 'cardona-core-service/src/extensions'

import { initDirectives } from 'cardona-core-service/src/directives'
import { registerPlugins } from 'cardona-core-service/src/@core/utils/plugins'
import vuex from './store'
import App from '@/App.vue'

// Styles
import 'cardona-core-service/src/@core/scss/template/index.scss'
import 'cardona-core-service/src/assets/styles/styles.scss'
import '@/assets/scss/code-diff.scss'

// Create vue app
const app = createApp(App)

// Register plugins
registerPlugins(app)

initDirectives(app)

app.use(vuex)

// Mount vue app
app.mount('#app')
