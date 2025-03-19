import store from '@/store'

export const getFormDataWithProject = <T>(form: T): T & { project: string } => ({
  ...form,
  project: store.getters.selectedProject.alias
})
