import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports, getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
import vuetify from 'vite-plugin-vuetify'
import dynamicImport from 'vite-plugin-dynamic-import'

const proxy_headers = {
  'CF-Access-Client-Id': 'a88c3a6e984d3e87ac3639eaeb013164.access',
  'CF-Access-Client-Secret': '51a0acc4b819c752169949cb2a04f52ee38d19a9ef4615598e2c6395d5133627',
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'https://cardona-staging.boffice.site/',
        headers: proxy_headers,
      },
      '/svc/img/i': {
        changeOrigin: true,
        target: 'https://cardona-staging.boffice.site/',
        headers: proxy_headers,
      },
    },
    watch: {
      ignored: ['!**/node_modules/cardona-core-service/src/**'],
    },
  },
  plugins: [
    // Docs: https://github.com/posva/unplugin-vue-router
    // ℹ️ This plugin should be placed before vue plugin
    VueRouter({
      getRouteName: routeNode => {
        // Convert pascal case to kebab case
        return getPascalCaseRouteName(routeNode)
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase()
      },
      exclude: ['**/**'],
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
        },
      },
    }),
    vueJsx(),

    // Docs: https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
    vuetify({
      styles: {
        configFile: 'node_modules/cardona-core-service/src/assets/styles/variables/_vuetify.scss',
      },
    }),

    // Docs: https://github.com/johncampionjr/vite-plugin-vue-layouts#vite-plugin-vue-layouts
    Layouts({
      layoutsDirs: 'node_modules/cardona-core-service/src/layouts/',
    }),

    // Docs: https://github.com/antfu/unplugin-vue-components#unplugin-vue-components
    Components({
      dirs: [
        'src/components',
        fileURLToPath(new URL('node_modules/cardona-core-service/src/@core/components', import.meta.url)),
        fileURLToPath(new URL('node_modules/cardona-core-service/src/components', import.meta.url)),
      ],
      excludeNames: ['DateField', 'PhoneField', 'CopyField', 'DateWithSecondsField', 'StatementField', 'StatusField'],
      dts: true,
      resolvers: [
        componentName => {
          if (componentName === 'VueApexCharts')
            return { name: 'default', from: 'vue3-apexcharts', as: 'VueApexCharts' }
        },
      ],
    }),

    // Docs: https://github.com/antfu/unplugin-auto-import#unplugin-auto-import
    AutoImport({
      imports: ['vue', VueRouterAutoImports, '@vueuse/core', '@vueuse/math', 'vue-i18n', 'pinia'],
      dirs: [
        fileURLToPath(new URL('node_modules/cardona-core-service/src/@core/utils', import.meta.url)),
        fileURLToPath(new URL('node_modules/cardona-core-service/src/@core/composable/', import.meta.url)),
        fileURLToPath(new URL('node_modules/cardona-core-service/src/composables/', import.meta.url)),
        fileURLToPath(new URL('node_modules/cardona-core-service/src/utils/', import.meta.url)),
        fileURLToPath(new URL('node_modules/cardona-core-service/src/plugins/*/composables/*', import.meta.url)),
      ],
      vueTemplate: true,

      // ℹ️ Disabled to avoid confusion & accidental usage
      ignore: ['useCookies', 'useStorage'],
    }),

    // Docs: https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#intlifyunplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: false,
      compositionOnly: true,
      include: [
        fileURLToPath(new URL('./src/plugins/i18n/locales/**', import.meta.url)),
      ],
    }),
    dynamicImport(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    includeSource: ['src/**/*.{js,ts,vue}'],
    setupFiles: './vitest.setup.ts',
    css: false,
    deps: {
      inline: ['vuetify'],
    },
    reporters: ['dot', 'github-actions'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json'],
      all: true,
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        'vite.config.ts',
      ],
      include: [
        'src/**/*.vue',
      ],
      excludeNodeModules: false,
      reportOnFailure: true,
    },
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@model': fileURLToPath(new URL('./src/@model', import.meta.url)),
      '@themeConfig': fileURLToPath(new URL('./themeConfig.ts', import.meta.url)),
      '@core': fileURLToPath(new URL('node_modules/cardona-core-service/src/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('node_modules/cardona-core-service/src/@layouts', import.meta.url)),
      '@images': fileURLToPath(new URL('node_modules/cardona-core-service/src/assets/images/', import.meta.url)),
      '@styles': fileURLToPath(new URL('node_modules/cardona-core-service/src/assets/styles/', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('node_modules/cardona-core-service/src/assets/styles/variables/_template.scss', import.meta.url)),
      '@db': fileURLToPath(new URL('./src/plugins/fake-api/handlers/', import.meta.url)),
      '@api-utils': fileURLToPath(new URL('./src/plugins/fake-api/utils/', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/services/api/axios.ts', import.meta.url)),
      '@productConfig': fileURLToPath(new URL('./src/configs/productConfig.ts', import.meta.url)),
      '@filterConfig': fileURLToPath(new URL('./src/@model/filterConfig.ts', import.meta.url)),
      '@permissions': fileURLToPath(new URL('./src/configs/permissions.ts', import.meta.url)),
      '@locale': fileURLToPath(new URL('node_modules/cardona-core-service/src/plugins/i18n/locales', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
    exclude: ['vuetify', 'cardona-core-service', '@layouts'],
    entries: [
      './src/**/*.vue',
    ],
  },
})
