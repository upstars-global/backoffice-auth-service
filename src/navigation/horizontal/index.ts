import { IconsList } from 'cardona-core-service/src/@model/enums/icons'

export default [
  {
    header: 'Pages',
    icon: IconsList.FileIcon,
    children: [
      {
        title: 'Dashboard',
        route: 'Dashboard',
        icon: IconsList.HomeIcon,
      },
    ],
  },
]
