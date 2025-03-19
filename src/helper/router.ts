import type { RouterConfig } from 'cardona-core-service/src/@model/router'
import { convertCamelCase } from 'cardona-core-service/src/helpers/index'
import type { RouteLocationNormalized } from 'vue-router'
import { PermissionLevel } from 'cardona-core-service/src/@model/permission'
import { permissionPrefix } from '@productConfig'

export default function sectionRouterGenerator(sectionConfigs: Array<RouterConfig>) {
  const arrRouters: Array<any> = []

  sectionConfigs.forEach((sectionConfig: RouterConfig) => {
    let importSTR = sectionConfig.isConvertName
      ? convertCamelCase(sectionConfig.name, '/')
      : sectionConfig.name

    if (sectionConfig.sectionName)
      importSTR = `${sectionConfig.sectionName}/${importSTR}`

    const entityUrl = sectionConfig.isProject === false ? `/${importSTR}` : `/:project/${importSTR}`
    const entityName = sectionConfig.name[0].toUpperCase() + sectionConfig.name.slice(1)
    const permission = `${permissionPrefix}-${convertCamelCase(sectionConfig.name, '-')}`

    arrRouters.push(
      ...[
        {
          path: entityUrl,
          name: `${entityName}List`,
          component: () => import(`@/pages/${importSTR}/list/index.vue`),
          meta: {
            title: `${sectionConfig.name}.list`,
            permission,
            breadcrumb: [
              {
                title: `${sectionConfig.name}.list`,
                active: true,
              },
            ],
          },
        },
        {
          path: `${entityUrl}/create/:id?`,
          name: `${entityName}Create`,
          component: () => import(`@/pages/${importSTR}/create/index.vue`),
          meta: {
            title: `${sectionConfig.name}.create`,
            permission,
            level: PermissionLevel.create,
            breadcrumb: [
              {
                to: { name: `${entityName}List` },
                title: `${sectionConfig.name}.list`,
              },
              {
                title: `${sectionConfig.name}.create`,
                active: true,
              },
            ],
          },
        },
        {
          path: `${entityUrl}/update/:id`,
          name: `${entityName}Update`,
          component: () => import(`@/pages/${importSTR}/update/index.vue`),
          meta: {
            title: `${sectionConfig.name}.edit`,
            permissionGroup: sectionConfig.isPermissionGroup ? sectionConfig.name : undefined,
            permission: !sectionConfig.isPermissionGroup ? permission : undefined,
            breadcrumb: [
              {
                to: { name: `${entityName}List` },
                title: `${sectionConfig.name}.list`,
              },
              {
                title: `${sectionConfig.name}.edit`,
                active: true,
              },
            ],
          },
        },
      ],
    )

    if (sectionConfig.withCard) {
      arrRouters.push(
        ...[
          {
            path: `${entityUrl}/card/:id`,
            name: `${entityName}Card`,
            component: () => import(`@/pages/${importSTR}/card/index.vue`),
            meta: {
              title: `${sectionConfig.name}.card`,
              permissionGroup: sectionConfig.isPermissionGroup ? sectionConfig.name : undefined,
              permission: !sectionConfig.isPermissionGroup ? permission : undefined,
              level: PermissionLevel.view,
              breadcrumb: [
                {
                  to: { name: `${entityName}List` },
                  title: `${sectionConfig.name}.list`,
                },
                {
                  title: `${sectionConfig.name}.card`,
                  active: true,
                },
              ],
            },
          },
        ],
      )
    }
  })

  return arrRouters
}

export const useScrollBehaviorOfRouter = () => {
  const actualNameOfRoute = ref<string>('')

  const scrollBehavior = (to: RouteLocationNormalized) => {
    if (to.name !== actualNameOfRoute.value || to.query.perPage) {
      actualNameOfRoute.value = to?.name?.toString()

      return { behavior: 'smooth', top: 0 }
    }
  }

  return { scrollBehavior }
}
