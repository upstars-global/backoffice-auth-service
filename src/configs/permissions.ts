import type { PermissionUpdatableTable } from 'cardona-core-service/src/@model/permission'
import { PermissionFormType } from 'cardona-core-service/src/@model/enums/permissions'

export enum PermissionType {
  BackofficeActionsCurrencies = 'backoffice-actions-currencies',
  BackofficGroups = 'backoffice-neocore-groups',
  BackofficeUsers = 'backoffice-neocore-users',
  BackofficeUsersControl = 'backoffice-users-control',
  BackofficeGamesCategories = 'backoffice-games-categories',
  BackofficeGamesCategoriesSeo = 'backoffice-games-categories-seo',
  BackofficeGamesCategoriesReport = 'backoffice-games-categories-report',
  BackofficeGames = 'backoffice-games',
  BackofficeGamesSeo = 'backoffice-games-seo',
  BackofficeGamesReport = 'backoffice-games-report',
  BackofficeGamesProducers = 'backoffice-games-producers',
  BackofficeGamesProducersSeo = 'backoffice-games-producers-seo',
  BackofficeGamesProducersReport = 'backoffice-games-producers-report',
  BackofficeGifts = 'backoffice-gifts',
  SectionSupportService = 'section-support-service',
  BackofficeProjects = 'backoffice-projects',
  BackofficeBanners = 'backoffice-banners',
  BackofficeStaticPages = 'backoffice-static-pages',
  BackofficeFeatureFlags = 'backoffice-feature-flags',
  BackofficeCohorts = 'backoffice-cohort',
  BackofficeStaticPagesSeo = 'backoffice-static-pages-seo',
  BackofficeStaticPagesReport = 'backoffice-static-pages-report',
  FieldPlayerMain = 'field-player-main',
  FieldPlayerStatus = 'field-player-status',
  FieldPlayerIsblocked = 'field-player-isblocked',
  FieldPlayerVerification = 'field-player-verification',
  FieldPlayerManager = 'field-player-manager',
  FieldPlayerAutopayment = 'field-player-autopayment',
  BackofficeNotes = 'backoffice-notes',
  BackofficeNotificationsSms = 'backoffice-notifications-sms',
  BackofficeNotificationsWeb = 'backoffice-notifications-web',
  FieldReadBalance = 'field-read-balance',
  BackofficeRealBalanceUpdate = 'backoffice-real-balance-update',
  BackofficePlayerPaymentSystem = 'backoffice-player-payment-system',
  PaymentWhitelist = 'backoffice-treasury-payment-systems-whitelist',
  MarbellaCards = 'marbella-cards',
  BackofficePaymentDailylimits = 'backoffice-payment-dailylimits',
  BackofficeTransactions = 'backoffice-transactions',
  BackofficeTransactionsPlayers = 'backoffice-transactions-players',
  BackofficePlayersBonus = 'backoffice-players-bonus',
  BackofficeGiftsPlayers = 'backoffice-gifts-players',
  BackofficePaymentBalanceslog = 'backoffice-payment-balanceslog',
  BackofficePaymentBalanceslogReport = 'backoffice-payment-balanceslog-report',
  BettingHistory = 'backoffice-betting-history',
  Multiaccounts = 'backoffice-player-multiaccounts',
  BackofficeLogaction = 'backoffice-logaction',
  TreasuryTransactionsChecks = 'backoffice-treasury-transactions-checks',
  AlaroGiftSpinTemplate = 'alaro-gift-spin-template',
  AlaroGiftSpinTemplateReport = 'alaro-gift-spin-template-report',
  BackofficePayouts = 'backoffice-payouts',
  BackofficePayoutsBotSettings = 'backoffice-payouts-bot-settings',
  BackofficeCashbacks = 'backoffice-cashbacks',
  BackofficePromoGifts = 'backoffice-promo-gifts',
  BackofficePromoCodesCampaign = 'backoffice-promo-codes-campaign',
  BackofficeVipManager = 'backoffice-vip-manager',
  BackofficeLogsPlayer = 'backoffice-logs-player',
  BackofficeWinBackPlayer = 'players-winback',
  BackofficeLimits = 'backoffice-limits',
  PlayersConsentsPromo = 'players-consents-promo',
  PlayersConsentsTransactional = 'players-consents-transactional',
  BackofficeLevels = 'backoffice-levels',
  BackofficePlayersDetailedList = 'players-detailed-list',
  BackofficePlayersDetailedListReport = 'players-detailed-list-report',
  BackofficeLimitsSelfExclusion = 'backoffice-limits-self-exclusion',
  BackofficeTournaments = 'backoffice-tournaments',
  BackofficeTags = 'backoffice-tags',
  BackofficeActionsMiles = 'backoffice-actions-miles',
  BackofficePayoutsToggleBot = 'backoffice-payouts-toggle-bot',
  BackofficeAchievements = 'backoffice-achievements',
  BackofficePayoutsApprove = 'backoffice-treasury-payouts-update-approve',
}
export default {
  manageAccess: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficGroups,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeUsers,
    },
  ] as PermissionUpdatableTable[],
  gamesCategories: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeGamesCategories,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeGamesCategoriesSeo,
      notAccessLevel: [4],
    },
    {
      type: PermissionFormType.Switch,
      target: PermissionType.BackofficeGamesCategoriesReport,
    },
  ] as PermissionUpdatableTable[],
  games: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeGames,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeGamesSeo,
      notAccessLevel: [4],
    },
    {
      type: PermissionFormType.Switch,
      target: PermissionType.BackofficeGamesReport,
    },
  ] as PermissionUpdatableTable[],
  gamesProducers: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeGamesProducers,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeGamesProducersSeo,
      notAccessLevel: [4],
    },
    {
      type: PermissionFormType.Switch,
      target: PermissionType.BackofficeGamesProducersReport,
    },
  ] as PermissionUpdatableTable[],
  players: [
    {
      type: PermissionFormType.Switch,
      target: PermissionType.SectionSupportService,
    },
    {
      type: PermissionFormType.Switch,
      target: PermissionType.BackofficeTransactionsPlayers,
    },
    {
      target: PermissionType.BackofficePlayersDetailedList,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 3, 4],
    },
    {
      type: PermissionFormType.Switch,
      target: PermissionType.BackofficePlayersDetailedListReport,
    },
    {
      target: PermissionType.BackofficeLevels,
      type: PermissionFormType.Table,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeVipManager,
    },
  ] as PermissionUpdatableTable[],
  configurations: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeProjects,
    },
  ] as PermissionUpdatableTable[],
  promo: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeBanners,
    },
  ] as PermissionUpdatableTable[],
  tournaments: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeTournaments,
      notAccessLevel: [4],
    },
  ] as PermissionUpdatableTable[],
  staticPages: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeStaticPages,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeStaticPagesSeo,
      notAccessLevel: [4],
    },
    {
      type: PermissionFormType.Switch,
      target: PermissionType.BackofficeStaticPagesReport,
    },
  ] as PermissionUpdatableTable[],
  playerCard: [
    {
      target: PermissionType.FieldPlayerMain,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.FieldPlayerStatus,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 3, 4],
    },
    {
      target: PermissionType.FieldPlayerIsblocked,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.FieldPlayerVerification,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.FieldPlayerManager,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.FieldPlayerAutopayment,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.BackofficeNotes,
      type: PermissionFormType.Table,
      notAccessLevel: [4],
    },
    {
      target: PermissionType.BackofficeNotificationsSms,
      type: PermissionFormType.Table,
      notAccessLevel: [3, 4],
    },
    {
      target: PermissionType.BackofficeNotificationsWeb,
      type: PermissionFormType.Table,
    },
    {
      target: PermissionType.FieldReadBalance,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 3, 4],
    },
    {
      target: PermissionType.BackofficeRealBalanceUpdate,
      type: PermissionFormType.Switch,
    },
    {
      target: PermissionType.BackofficePlayerPaymentSystem,
      type: PermissionFormType.Table,
    },
    {
      target: PermissionType.MarbellaCards,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 3],
    },
    {
      target: PermissionType.BackofficePaymentDailylimits,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.BackofficeTransactions,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 3, 4],
    },
    {
      target: PermissionType.BackofficePlayersBonus,
      type: PermissionFormType.Table,
      notAccessLevel: [3],
    },
    {
      target: PermissionType.BackofficeGiftsPlayers,
      type: PermissionFormType.Table,
    },
    {
      target: PermissionType.BackofficePaymentBalanceslog,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 3, 4],
    },
    {
      target: PermissionType.BettingHistory,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 3, 4],
    },
    {
      target: PermissionType.Multiaccounts,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.PaymentWhitelist,
      type: PermissionFormType.Table,
    },
    {
      target: PermissionType.TreasuryTransactionsChecks,
      type: PermissionFormType.Table,
      notAccessLevel: [4],
    },
    {
      target: PermissionType.BackofficeLimits,
      type: PermissionFormType.Table,
    },
    {
      target: PermissionType.PlayersConsentsPromo,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.PlayersConsentsTransactional,
      type: PermissionFormType.Table,
      notAccessLevel: [2, 4],
    },
    {
      target: PermissionType.BackofficeLimitsSelfExclusion,
      type: PermissionFormType.Table,
      notAccessLevel: [3],
    },
    {
      target: PermissionType.BackofficeWinBackPlayer,
      type: PermissionFormType.Switch,
      forAccessLevelValue: 3,
    },
    {
      target: PermissionType.BackofficeLogsPlayer,
      type: PermissionFormType.Switch,
    },
    {
      target: PermissionType.BackofficePaymentBalanceslogReport,
      type: PermissionFormType.Switch,
    },
  ] as PermissionUpdatableTable[],
  gifts: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeCashbacks,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeGifts,
      notAccessLevel: [4],
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficePromoGifts,
      notAccessLevel: [4],
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.AlaroGiftSpinTemplate,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficePromoCodesCampaign,
    },
    {
      type: PermissionFormType.Switch,
      target: PermissionType.AlaroGiftSpinTemplateReport,
    },
  ] as PermissionUpdatableTable[],
  achievements: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeAchievements,
    },
  ] as PermissionUpdatableTable[],
  actions: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeActionsMiles,
      notAccessLevel: [4],
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeActionsCurrencies,
      notAccessLevel: [4],
    },
  ] as PermissionUpdatableTable[],
  settings: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeFeatureFlags,
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeTags,
    },
  ] as PermissionUpdatableTable[],
  cashbox: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficeCohorts,
    },
  ] as PermissionUpdatableTable[],
  payouts: [
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficePayouts,
      notAccessLevel: [2, 4],
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficePayoutsBotSettings,
      notAccessLevel: [2, 4],
    },
    {
      type: PermissionFormType.Table,
      target: PermissionType.BackofficePayoutsApprove,
      notAccessLevel: [2, 4],
    },
    {
      type: PermissionFormType.Switch,
      target: PermissionType.BackofficePayoutsToggleBot,
      forAccessLevelValue: 3,
    },
  ] as PermissionUpdatableTable[],
  other: [
    {
      type: PermissionFormType.Switch,
      target: PermissionType.BackofficeLogaction,
    },
  ] as PermissionUpdatableTable[],
}
