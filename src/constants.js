export const APP_NAME = 'NGCP Admin UI'

export const WAIT_SUB_CONTEXT = 'aui-sub-context'
export const WAIT_PAGE = 'aui-page'
export const WAIT_PREFERENCES = 'aui-preferences-*'

export const LAYOUT_DEFAULT = 'lHh Lpr lFf'

export const INTERNAL_DATE_FORMAT = 'YYYY/MM/DD'
export const INTERNAL_TIME_FORMAT = 'HH:mm'
export const INTERNAL_DATE_TIME_FORMAT = `${INTERNAL_DATE_FORMAT} ${INTERNAL_TIME_FORMAT}`
export const INTERNAL_DATE_TIME_SECONDS_FORMAT = `${INTERNAL_DATE_TIME_FORMAT}:ss`

export const DATETIME_DEFAULT_DISPLAY_FORMAT = INTERNAL_DATE_TIME_FORMAT
export const DATETIME_DEFAULT_API_FORMAT = 'YYYY-MM-DD HH:mm'

/* MAX_ITEMS_FOR_ALL_ROWS_REQ is used to get the data to fill the Aui-data-table when the 'All' filter is activated.
API does not have an option to request all available items, so we will consider this hard-codded amount as ALL rows in UI. */
export const MAX_ITEMS_FOR_ALL_ROWS_REQ = 10000

export const ADMIN_LIST_LOGIN_MIN_LENGTH = 5

export const TIMELINE_DEFAULT_VIEW_DAYS_BEFORE_AND_AFTER_NOW = 5
export const TIMELINE_YEARS_AHEAD_FOR_MAX_DATE = 20

export const CURRENCY_DEFAULT_LOCALE = 'en-US'

export const PLATFORM_CE = 'spce'
export const PLATFORM_PRO = 'sppro'
export const PLATFORM_CARRIER = 'carrier'

export const LICENSES = {
    aof: 'aof',
    batch_provisioning: 'batch_provisioning',
    billing: 'billing',
    call_recording: 'call_recording',
    device_provisioning: 'device_provisioning',
    fax: 'fax',
    header_manipulation: 'header_manipulation',
    invoice: 'invoice',
    pbx: 'pbx',
    phonebook: 'phonebook',
    pushd: 'pushd',
    reseller: 'reseller',
    transcoding: 'transcoding'
}
