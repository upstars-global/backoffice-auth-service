// import Vue from 'vue'
// import * as Sentry from '@sentry/vue'
// import { BrowserTracing } from '@sentry/tracing'
//
// const isProductionMode = process.env.NODE_ENV === 'production'
//
// if (isProductionMode) {
//   Sentry.init({
//     Vue,
//     dsn: 'https://11d3246b31e043e4985dd9b69116a195@o1057380.ingest.sentry.io/4504751292022784',
//     environment:
//       process.env.VUE_APP_COMMIT_REF_SLUG === 'master'
//         ? 'production'
//         : process.env.VUE_APP_COMMIT_REF_SLUG === 'develop'
//         ? 'development'
//         : 'dynamic',
//     integrations: [
//       new BrowserTracing({
//         tracePropagationTargets: [
//           'cardona-develop.upstr.to',
//           'cardona-staging.upstr.to',
//           'cardona.upstr.to',
//           /^\//,
//         ],
//       }),
//     ],
//     trackComponents: true,
//     logErrors: true,
//     attachProps: true,
//     attachStacktrace: true,
//     tracesSampleRate: 0.2,
//   })
// }
