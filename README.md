# Cardona - Backoffice

## Документация и примеры

- [Vuexy - template](https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/dashboard/ecommerce) - Документация и примеры использования всех компонентов, виджетов, шрифтов и цветовой схемы.

- [Bootstrap 4](https://bootstrap-vue.org/) - все ui-компоненты Vuexy `<b-*>...</b-*>` базируются на Bootstrap 4.

## Usage
- `yarn build` - сборка в продакшен
- `yarn dev` - запуск дев-сервера в режиме разработки 
- `yarn test:unit` - запуск unit-тестов
- `yarn lint` - провека кода на соответсвие eslint'а 

## Work flow
> `Open -> In progress -> code review -> QA -> QA in testing -> RC or Reopened -> Done`

1. Чтобы приступить к задаче необходимо создать ветку с идентичным название в jira. К примеру если задача имеет номер `BAC-100`, то и branch в git должен имеет эквивалентное название `BAC-100`.
2. После того как задача появилась на борде, необходимо её перевести в `in progress`, а по завершению написания кода в `code review`. После успешного ревью, необходимо отдать задачу в тестирование (перевести в `QA`). Задача считается завершенной, только тогда когда она имеет статус `done`



## CI/CD Flow
> `docker build -> trigger gitlab.ci -> push docker image to k8s`

Cardona имеет свою собственную систему сборки c последующей доставкой в k8s.
В файле .gitlab-ci.yml подробно описан процесс сборки и доставки образа.

Отдельная настройка ingress-конфигов находится здесь - [cardona gitops](https://gitlab.bbq.agency/gitops/charts/lr/cardona/)




## Branches
- `master` - когда код попадает в master ветку, то он автоматически деплоится на [cardona-staging.os.show](https://cardona-staging.os.show/), а далее его вручную можно доставить на прод через [argo.os.show](https://argo.os.show/)
- `develop` - когда код попадает в develop ветку, то он автоматически деплоится на [cardona-develop.os.show](https://cardona-develop.os.show/)
- `BAC-{n}` - название задачи в jira=git branch. Для того, чтобы задеплоить на [cardona-staging.os.show](https://cardona-staging.os.show/) - нужно сделать в ветке `develop` -> `git merge BAC-{n}`, где `n` - номер задачи, а далее необходимо сделать `git push`


## File Structure
- `@core` - Набор простых и функциональных компонентов, конфигов, директив, миксинов, утилит, стилей и всё в таком духе. Проще говоря, всё что можно переиспользовать стоит выносить в `core`
- `@fake-db` - Директория служит для фейковых респонсов (моков) сервера
- `@model` - Все данные которые приходят с сервера или которые отвечают за бизнес логику должны быть реализованны через модели
- `@queries` - Единая точка входа для всех http-запросов. Любой запрос, который используется в системе должен находится здесь и экспортировать функцию для последующих вызовов из любой точки приложения
- `assets` - шрифты, картинки, стили и тп.
- `layouts` - темплейты для отображения страниц
- `libs` - подключенные библиотеки с кастомными настройками (пример: `i18n`, `toast`) или же целиком самописанные библиотеки
- `router` - конфиг для страниц
- `store` - типизированный vuex на основе классов с использованием декораторов. Примеры ниже.
- `testSetup` - глобальные хуки/компоненты/плагины, которые нужны в кажом тесте vue.
- `views` - страницы которые подключаются в router

## Override Vuexy must be restricted
> Готовый набор компонентов предоставленный Vuexy нельзя редактировать, если есть несоответствие дизайна с кодом, то проблема в дизайне. Необходимо создать задачу на фикс проблемы в дизайне.

## Unit Tests
> Тесты под коробокой используют jest. Для написания unit-тестов на vue нужно использовать плагин `@vue/test-utils`. Файлы тестов находятся в директории непосредственно с компонентами `.vue`. Пример структуры:
```
├── component/some-cmp
│   ├── SomeCmp.vue
│   └── SomeCmp.spec.ts
```

## Style Guide

### Don't use anonymous objects instead of use classes

```javascript
// Bad
const user = {
  firstName: "No",
  lastName: "Name"
}

// Good
interface UserInput {
  firstName: string
  lastName: string
}

class User implements UserInput {
  constructor(data: UserInput) {
    this.firstName = data.firstName
    this.lastName = data.lastName
  }
}

const user = new User({
  firstName: "No",
  lastName: "Name"
})
```

### Http Examples
> Все запросы отправляются через написанный нами ApiService, url не передается, он автоматически строится из типа запроса, который является обязательным параметром. 
> Все запросы отправляются через store actions 

```javascript
import ApiService from 'cardona-core-service/src/services/api'

actions: {
    async fetchBannersStrategy({ rootGetters }) {
        const bannerTypeList = new BannerStrategyList(
            await ApiService.request({
                type: 'App.V2.Banners.Types.List',
                data: {
                    project: rootGetters.selectedProject.alias,
                },
            })
        )
    },
},
```

### Local Storage Examples
> Функционал работы с local storage полностью типизирован. Например, если нужно получить или передать какие-либо данные в local storage - необходимо передать class-конструктор, для преобразования `raw data` из local storage в `instance` необходимого класса.
> Такой подход позваляет улучшить прозрачность формирования данных и понимать какой `class` является владельцем этих данных.

```javascript
import { getStorage, setStorage } from 'cardona-core-service/src/helpers/storage'

const keyStorage = 'current-user-data'

interface UserInput {
  firstName: string
  lastName: string
}

class User implements UserInput {
  constructor(data: UserInput) {
    this.firstName = data.firstName
    this.lastName = data.lastName
  }
}

const userFromStorage = getStorage(User)(keyStorage) // userFromStorage instanceof User -> true

const updatedUser = new User(...)
setStorage(keyStorage, updatedUser)
```

### Redirect when changing the project
> Если необходимо перенаправить пользователя на другую страницу при изменении проекта, нужно добавить ключ `changingProjectRouteName` в объекте `meta` параметров роута
```javascript
{
  path: '/concierge/player/:id',
    name: 'ConciergePlayer',
    component: () => import('@/views/apps/concierge/ConciergePlayer.vue'),
    meta: {
      title: 'conciergeService', 
      permission: 'section-concierge-service',
      changingProjectRouteName: 'ConciergeService'
  }
}
```

### Names
Компоненты и папки именуем в одном стиле с эндпоинтами бекенда

// Store
```javascript
// create
  const { data } = await ApiService.request(
    {
      type: 'App.V2.Projects.Create',
      data: new ProjectSubmissionData(project),
    },
    {
      formRef,
    }
  )

// update
const { data } = await ApiService.request({
    type: 'App.V2.Projects.Update',
    data: new ProjectSubmissionData(project),
})

```
// Folders
- pages
  - project
    - create
      - index
    - update
      - index


// index.vue
```javascript
export default defineComponent({
  name: 'ProjectCreate',
  components: {}
  }

export default defineComponent({
    name: 'ProjectUpdate',
    components: {}
```

// router
```javascript
{
    path: '/projects/create',
    name: 'ProjectCreate',
    component: () => import('@/pages/project/create'),
}

{
    path: '/projects/update/:id', 
    name: 'ProjectUpdate',
    component: () => import('@/pages/project/update'),
}
```

### Permissions
> Доступы добавляются в фаил **permission.ts** по пути cardona-core-service/src/@model/permission.ts
в приватную переменную private _allPermission хранящую в себе структурированы JSON.
На первом уровне вложенности в нем указываться группа доступов.

```javascript
_allPermission = {
 manageAccess: [
  {
   type: 'table',
   target: 'backoffice-groups',
  },
  …,
 ] as PermissionEditableTable[],
…,
}
```
>**manageAccess** - это и есть название группы
Внутри группы и размещаешься объект доступа

Рассмотрим ниже пример объекта со всеми возможными полями
```javascript
{
 target: 'balance',
 type: 'table',
 notAccessLevel: [2, 3, 4],
 trigger: [
  {
   addictionLevelItem: 0,
   itemActive: [
    {
     target: 'api-withdraw',
     access: 0,
    },
    {
     target: 'api-replenishment',
     access: 0,
    },
	…
   ],
  },
  …
   ],
  },
 ],
},
```

> **target** (обязательное поле) - имя доступа которое совпадает с именем из таблицы с вики джире https://wiki.bbq.agency/pages/viewpage.action?pageId=13640709
> 
> **type** (обязательное поле) - (‘table’ | ‘switch’) - тип визуального отображения
>
>**table** - таблица с правами доступа вида
0 - нет доступа
1 - просмотр
2 - добавление
3 - редактирование
4 - удаление
> 
>**switch** - таблица с правами доступа вида
0 - нет доступа
1 - просмотр
> 
>**notAccessLevel** (опциональное поле) - данно поле принимает массив с уровнями доступов которые не должны отображаться для данного доступа, работает только для типа ‘table’
>
>**trigger** (опциональное поле) - которое показывает взаимосвязи с другими доступами

### РАБОТА поля trigger:
```javascript
trigger: [
  {
    addictionLevelItem: 0,
    itemActive: [
      {
        target: 'api-withdraw',
        access: 0,
      },
      {
        target: 'api-replenishment',
        access: 0,
      },
	…
],
},
…
],
```

>**addictionLevelItem** - уровень на котором сработает триггер (допустим 0 - нет доступа)
>
>**itemActive** - массив доступов с которыми произойдёт действие
>
>**target** - имя доступа над которым произойдёт действие
>
>**access** - уровень доступа который будет установлен данному доступу

Итого мы имеем что ЕСЛИ доступ на котором установлен такой trigger === 0 (addictionLevelItem),
ТО и доступам ‘api-withdraw’ и ‘api-replenishment’ (target в itemActive) установиться уровень 0 (access в itemActive).
Данная система весьма гибкая и тонко настраиваемая.
После добавления доступа в текущие группы, доступ автоматически появиться в настройке групп.
Если же нужно задать новую группу доступов, то ее так же нужно отрисовать используя компонент
```javascript
<group-fragment-settings-table
:permissions="allPermission.manageAccess"
:title="$t('groupEditPage.accessControl')"
@change="onChange"
/>
```
>**allPermission** - класс в котором храниться все группы доступов (пути cardona-core-service/src/@model/permission.ts)

### ПРОВЕРКА ДОСТУПОВ
Для проверки доступов используется стор ‘currentUser.ts’ по пути ‘store/currentUser.ts’ и его два гетера
‘abilityCan’ и ‘abilityCanInGroup’
abilityCan(target: string, access: number | PermissionLevel)
target - имя доступа для проверки
access - левел доступа или название доступа на который проверяем
Можно передать как число так и слово PermissionLevel = ‘noaccess’ | ‘view’ | ‘add’ | ‘edit’ | ‘delete’

	ПРИМЕР
	$currentUser.abilityCan(‘bonus-balance’, 1)
	вернет true если уровень ‘balance’ больше или равен просмотру (>= 1)

abilityCanInGroup(group: PermissionGrope | string[], access: number | PermissionLevel, all: boolean = false )
group - название группы или массив названий доступов
access - левел доступа или название доступа на который проверяем
all - (false поумолчанию) - флаг для проверки что вся группа соответствует условию

	ПРИМЕР
	$currentUser.abilityCanInGroup(‘balances’, ‘view’)
	вернет true если уровень хотяб одного из уровней доступа группы балансы больше или равен просмотру (>= 1)
	$currentUser.abilityCanInGroup(‘balances’, ‘view’, true)
	вернет true если уровень ВСЕ из уровней доступа группы балансы больше или равен просмотру (>= 1)
	$currentUser.abilityCanInGroup([‘balance’, ‘payouts-balance’, ‘winback-balance’], ‘view’)
	вернет true если уровень хотяб одного из уровней доступа в массиве больше или равен просмотру (>= 1) (отредактировано)

```javascript
private _allPermission = {
    manageAccess: [
      {
        type: 'table',
        target: 'backoffice-groups',
      },
      {
        type: 'table',
        target: 'backoffice-users',
      },
    ] as PermissionEditableTable[],
    players: [
      {
        type: 'switch',
        target: 'section-concierge-service',
      },
    ] as PermissionEditableTable[],
    configurations: [
      {
        type: 'table',
        target: 'backoffice-projects',
      },
    ] as PermissionEditableTable[],
    balances: [
      // vCoin
      {
        target: 'balance',
        type: 'table',
        notAccessLevel: [2, 3, 4],
        trigger: [
          {
            addictionLevelItem: 0,
            itemActive: [
              {
                target: 'api-withdraw',
                access: 0,
              },
              {
                target: 'api-replenishment',
                access: 0,
              },
            ],
          },
          {
            addictionLevelItem: 1,
            itemActive: [
              {
                target: 'api-withdraw',
                access: 1,
              },
              {
                target: 'api-replenishment',
                access: 1,
              },
            ],
          },
        ],
      },
      {
        target: 'record-log',
        type: 'table',
        notAccessLevel: [2, 3, 4],
      },
      {
        target: 'api-withdraw',
        type: 'switch',
        trigger: [
          {
            addictionLevelItem: 0,
            itemActive: [
              {
                target: 'field-balance',
                access: 0,
              },
            ],
            addiction: [
              {
                target: 'api-replenishment',
                access: 0,
              },
            ],
          },
          {
            addictionLevelItem: 1,
            itemActive: [
              {
                target: 'field-balance',
                access: 1,
              },
            ],
          },
        ],
      },
      {
        target: 'api-replenishment',
        type: 'switch',
        trigger: [
          {
            addictionLevelItem: 0,
            itemActive: [
              {
                target: 'field-balance',
                access: 0,
              },
            ],
            addiction: [
              {
                target: 'api-withdraw',
                access: 0,
              },
            ],
          },
          {
            addictionLevelItem: 1,
            itemActive: [
              {
                target: 'field-balance',
                access: 1,
              },
            ],
          },
        ],
      },
    ] as PermissionEditableTable[],
    playerCommunication: [
      {
        target: 'api-sms-log',
        type: 'table',
        notAccessLevel: [2, 3, 4],
      },
      {
        target: 'api-sms-send',
        type: 'switch',
      },
    ] as PermissionEditableTable[],
  }
```
