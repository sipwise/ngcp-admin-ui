import _ from 'lodash'

export function prepareBillingProfileFormData (data, isInbound = true) {
    if (!data) {
        return data
    }
    const clonedData = _.cloneDeep(data)
    const profileCollections = [
        'billing_profiles',
        'all_billing_profiles'
    ]
    const sourceKey = isInbound ? 'stop' : 'end'
    const targetKey = isInbound ? 'end' : 'stop'
    profileCollections.forEach((collection) => {
        if (Array.isArray(clonedData[collection]) && clonedData[collection].length > 0) {
            clonedData[collection] = clonedData[collection].map((profile) => {
                const profileCopy = { ...profile }
                if (sourceKey in profileCopy) {
                    profileCopy[targetKey] = profileCopy[sourceKey] || null
                    delete profileCopy[sourceKey]
                } else if (!(targetKey in profileCopy)) {
                    profileCopy[targetKey] = null
                }
                return profileCopy
            })
        }
    })
    return clonedData
}
