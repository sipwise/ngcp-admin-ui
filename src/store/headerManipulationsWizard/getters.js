import { i18n } from 'boot/i18n'

export function ruleOptions () {
    return [
        {
            value: 'a_inbound',
            label: i18n.global.t('Inbound')
        },
        {
            value: 'b_outbound',
            label: i18n.global.t('Outbound')
        },
        {
            value: 'reply',
            label: i18n.global.t('Reply')
        }
    ]
}

export function conditionsOptions () {
    return [
        {
            value: 'exist',
            label: i18n.global.t('Exists')
        },
        {
            value: 'not_exist',
            label: i18n.global.t('Does not exist')
        },
        {
            value: 'equal',
            label: i18n.global.t('Equals to')
        },
        {
            value: 'not_equal',
            label: i18n.global.t('Does not equals to')
        },
        {
            value: 'start',
            label: i18n.global.t('Starts with')
        },
        {
            value: 'not_start',
            label: i18n.global.t('Does not start with')
        },
        {
            value: 'contain',
            label: i18n.global.t('Contains')
        },
        {
            value: 'not_contain',
            label: i18n.global.t('Does not contain')
        },
        {
            value: 'end',
            label: i18n.global.t('Ends with')
        },
        {
            value: 'not_end',
            label: i18n.global.t('Does not end with')
        },
        {
            value: 'regexp',
            label: i18n.global.t('Regex')
        }

    ]
}
export function actionsOptions () {
    return [
        {
            value: 'add',
            label: i18n.global.t('Add')
        },
        {
            value: 'set',
            label: i18n.global.t('Set')
        },
        {
            value: 'copy',
            label: i18n.global.t('Copy')
        },
        {
            value: 'drop',
            label: i18n.global.t('Drop')
        },
        {
            value: 'add_prefix',
            label: i18n.global.t('Add prefix')
        },
        {
            value: 'remove_prefix',
            label: i18n.global.t('Remove prefix')
        },
        {
            value: 'add_suffix',
            label: i18n.global.t('Add suffix')
        },
        {
            value: 'remove_suffix',
            label: i18n.global.t('Remove suffix')
        },
        {
            value: 'reject_call_with_code',
            label: i18n.global.t('Reject call with code')
        }

    ]
}
