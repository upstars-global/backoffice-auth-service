import { LoginForm } from 'cardona-core-service/src/@model/auth'
import type { UseEntityType } from 'cardona-core-service/src/@model/templates/baseSection'

const entityName = 'Auth'

export const useAuthForm = (): UseEntityType<LoginForm> => {
  const EntityFormClass = LoginForm

  return {
    entityName,
    EntityFormClass,
  }
}
