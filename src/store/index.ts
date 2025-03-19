import store from 'cardona-core-service/src/store/index'

import locale from './modules/locale'

const modules = [
  { name: 'locale', module: locale },
]

modules.forEach(({ name, module }: { name: string; module: object }) => {
  store.registerModule(name, module)
})

export const { state, getters, commit, dispatch } = store

export default store
