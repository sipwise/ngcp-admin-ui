import { i18n } from 'boot/i18n'

export function billingProfileTypeOptions () {
    return [
        {
            value: 'single',
            definition: 'id',
            label: i18n.global.t('single (actual billing profile)')
        },
        {
            value: 'schedule',
            definition: 'profiles',
            label: i18n.global.t('schedule (billing mapping intervals)')
        },
        {
            value: 'package',
            definition: 'package',
            label: i18n.global.t('package (initial profiles of a profile package)')
        }
    ]
}

export function billingProfilePrepaidLibraryOptions () {
    return ['libswrate', 'libinewrate']
}

export function billingProfileFraudIntervalLockOptions () {
    return [
        {
            value: 0,
            label: i18n.global.t('none')
        },
        {
            value: 1,
            label: i18n.global.t('foreign calls')
        },
        {
            value: 2,
            label: i18n.global.t('all outgoing calls')
        },
        {
            value: 3,
            label: i18n.global.t('incoming and outgoing')
        },
        {
            value: 4,
            label: i18n.global.t('global (including CSC)')
        },
        {
            value: 5,
            label: i18n.global.t('ported (call forwarding only)')
        }
    ]
}
export function unitTimes () {
    return [
        { label: 'minute(s)', value: 'minute' },
        { label: 'hour(s)', value: 'hour' },
        { label: 'day(s)', value: 'day' },
        { label: 'week(s)', value: 'week' },
        { label: 'month(s)', value: 'month' }
    ]
}
export function balanceIntervalStart () {
    return [
        {
            value: '1st',
            label: '1st day of month, at 00:00 system time'
        },
        {
            value: '1st_tz',
            label: '1st day of month, at 00:00 contract time'
        },
        {
            value: 'create',
            label: 'customer creation date, at 00:00 system time'
        },
        {
            value: 'create_tz',
            label: 'customer creation date, at 00:00 contract time'
        },
        {
            value: 'topup_interval',
            label: 'start interval upon top-up'
        },
        {
            value: 'topup',
            label: 'new interval for each top-up'
        }
    ]
}
export function carryOver () {
    return [
        {
            value: 'carry_over',
            label: 'carry over'
        },
        {
            value: 'carry_over_timely',
            label: 'carry over only if topped-up timely'
        },
        {
            value: 'discard',
            label: 'discard'
        }
    ]
}
export function underrunLockLevel () {
    return [
        {
            value: null,
            label: "don't change"
        },
        {
            value: 0,
            label: 'no lock'
        },
        {
            value: 1,
            label: 'foreign'
        },
        {
            value: 2,
            label: 'outgoing'
        },
        {
            value: 3,
            label: 'all calls'
        },
        {
            value: 4,
            label: 'global'
        },
        {
            value: 5,
            label: 'ported (call forwarding only)'
        }
    ]
}
export function topupLockLevel () {
    return [
        {
            value: null,
            label: "don't change"
        },
        {
            value: 0,
            label: 'no lock (unlock)'
        },
        {
            value: 1,
            label: 'foreign'
        },
        {
            value: 2,
            label: 'outgoing'
        },
        {
            value: 3,
            label: 'all calls'
        },
        {
            value: 4,
            label: 'global'
        },
        {
            value: 5,
            label: 'ported (call forwarding only)'
        }
    ]
}
export function matchModeOptions () {
    return [
        {
            value: 'regex_longest_pattern',
            label: 'Regular expression - longest pattern'
        },
        {
            value: 'regex_longest_match',
            label: 'Regular expression - longest match'
        },
        {
            value: 'prefix',
            label: 'prefix'
        },
        {
            value: 'exact_destination',
            label: 'exact_destination'
        }
    ]
}
export function directionOptions () {
    return [
        {
            value: 'out',
            label: 'outbound'
        },
        {
            value: 'in',
            label: 'inbound'
        }
    ]
}
