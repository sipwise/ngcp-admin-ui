
export function billingProfileLabel (billingProfile) {
    if (billingProfile) {
        return '#' + billingProfile.id + ' - ' + billingProfile.name + ' (' + billingProfile.handle + ')'
    } else {
        return null
    }
}

export function billingNetworkLabel (billingNetwork) {
    if (billingNetwork) {
        return '#' + billingNetwork.id + ' - ' + billingNetwork.name
    } else {
        return null
    }
}

export function profilePackageLabel (profilePackage) {
    if (profilePackage) {
        return '#' + profilePackage.id + ' - ' + profilePackage.name
    } else {
        return null
    }
}

export function contactLabel (contact) {
    if (contact) {
        return '#' + contact.id + ' - ' + contact.email
    } else {
        return null
    }
}

export function emailTemplateLabel (emailTemplate) {
    if (emailTemplate) {
        return '#' + emailTemplate.id + ' - ' + emailTemplate.name
    } else {
        return null
    }
}

export function resellerLabel (reseller) {
    if (reseller) {
        return '#' + reseller.id + ' - ' + reseller.name
    } else {
        return null
    }
}
