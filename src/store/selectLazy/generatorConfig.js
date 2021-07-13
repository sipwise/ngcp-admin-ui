import { billingProfileLabel, idAndNameLabel } from 'src/filters/resource'
import { defaultFilterPayloadTransformation, resellerPayloadTransformation } from 'src/api/common'

function actionPayloadTransformationFn (payload) {
    payload = defaultFilterPayloadTransformation(payload)
    payload = resellerPayloadTransformation(payload)
    return payload
}

function defaultOptionsGetterFn (item) {
    return {
        label: idAndNameLabel(item),
        value: item.id
    }
}
export default {
    SelectLazy: [
        {
            name: 'emailTemplatesList',
            apiOptions: {
                resource: 'emailtemplates'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn
        }, {
            name: 'invoiceTemplatesList',
            apiOptions: {
                resource: 'invoicetemplates'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn
        },
        {
            name: 'billingProfilesList',
            apiOptions: {
                resource: 'billingprofiles'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: billingProfileLabel(item),
                    value: item.id
                }
            }
        }, {
            name: 'billingNetworksList',
            apiOptions: {
                resource: 'billingnetworks'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'profilePackagesList',
            apiOptions: {
                resource: 'profilepackages'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.id
                }
            }
        },
        {
            name: 'rewriteRuleSetList',
            apiOptions: {
                resource: 'rewriterulesets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        },
        {
            name: 'ncosLevelList',
            apiOptions: {
                resource: 'ncoslevels'
            },
            actionPayloadTransformationFn (payload) {
                payload = defaultFilterPayloadTransformation(payload)
                payload.level = payload.name
                delete payload.name
                payload = resellerPayloadTransformation(payload)
                return payload
            },
            defaultOptionsGetterFn (item) {
                return {
                    label: item.level,
                    value: item.level
                }
            }
        },
        {
            name: 'soundSetList',
            apiOptions: {
                resource: 'soundsets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        },
        {
            name: 'headerRuleSetList',
            apiOptions: {
                resource: 'headerrulesets'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        },
        {
            name: 'emergencyMappingContainerList',
            apiOptions: {
                resource: 'emergencymappingcontainers'
            },
            actionPayloadTransformationFn,
            defaultOptionsGetterFn (item) {
                return {
                    label: idAndNameLabel(item),
                    value: item.name
                }
            }
        }
    ]
}
