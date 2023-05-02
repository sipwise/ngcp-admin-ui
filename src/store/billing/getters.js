import { i18n } from 'boot/i18n'

export function billingProfileTypeOptions () {
    return [
        {
            value: 'single',
            definition: 'id',
            label: i18n.global.tc('single (actual billing profile)')
        },
        {
            value: 'schedule',
            definition: 'profiles',
            label: i18n.global.tc('schedule (billing mapping intervals)')
        },
        {
            value: 'package',
            definition: 'package',
            label: i18n.global.tc('package (initial profiles of a profile package)')
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
            label: i18n.global.tc('none')
        },
        {
            value: 1,
            label: i18n.global.tc('foreign calls')
        },
        {
            value: 2,
            label: i18n.global.tc('all outgoing calls')
        },
        {
            value: 3,
            label: i18n.global.tc('incoming and outgoing')
        },
        {
            value: 4,
            label: i18n.global.tc('global (including CSC)')
        },
        {
            value: 5,
            label: i18n.global.tc('ported (call forwarding only)')
        }
    ]
}
