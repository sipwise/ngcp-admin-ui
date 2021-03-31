import { i18n } from 'boot/i18n'

const EMPTY_OPTIONS_LIST = [{
    label: i18n.t('No data available'),
    disable: true
}]
export function billingProfilesAsOptions (state) {
    if (state.billingProfiles.length > 0) {
        return state.billingProfiles.map(profile => {
            return {
                label: `#${profile.id} ${profile.name} ( ${i18n.t('Reseller')}: ${profile.handle} )`,
                value: profile.id
            }
        })
    } else {
        return EMPTY_OPTIONS_LIST
    }
}

export function billingNetworksAsOptions (state) {
    if (state.billingNetworks.length > 0) {
        return state.billingNetworks.map(network => {
            const resellerId = network.reseller_id ? '(' + i18n.t('ResellerId') + ':' + network.reseller_id + ')' : ''
            return {
                label: `#${network.id} ${network.name} ${resellerId}`,
                value: network.id
            }
        })
    } else {
        return EMPTY_OPTIONS_LIST
    }
}

export function billingProfileTypeOptions () {
    return [
        {
            value: 'single',
            definition: 'id',
            label: i18n.t('single (actual billing profile)')
        },
        {
            value: 'schedule',
            definition: 'profiles',
            label: i18n.t('schedule (billing mapping intervals)')
        },
        {
            value: 'package',
            definition: 'package',
            label: i18n.t('package (initial profiles of a profile package)')
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
            label: i18n.t('none')
        },
        {
            value: 1,
            label: i18n.t('foreign calls')
        },
        {
            value: 2,
            label: i18n.t('all outgoing calls')
        },
        {
            value: 3,
            label: i18n.t('incoming and outgoing')
        },
        {
            value: 4,
            label: i18n.t('global (including CSC)')
        },
        {
            value: 5,
            label: i18n.t('ported (call forwarding only)')
        }
    ]
}