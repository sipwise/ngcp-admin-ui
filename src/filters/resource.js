
export function idAndNameLabel (item) {
    if (item) {
        return '#' + item.id + ' - ' + item.name
    } else {
        return null
    }
}

export function billingProfileLabel (billingProfile) {
    if (billingProfile) {
        return '#' + billingProfile.id + ' - ' + billingProfile.name + ' (' + billingProfile.handle + ')'
    } else {
        return null
    }
}

export function billingNetworkLabel (billingNetwork) {
    return idAndNameLabel(billingNetwork)
}

export function profilePackageLabel (profilePackage) {
    return idAndNameLabel(profilePackage)
}

export function contactLabel (contact) {
    if (contact) {
        return '#' + contact.id + ' - ' + contact.email
    } else {
        return null
    }
}

export function emailTemplateLabel (emailTemplate) {
    return idAndNameLabel(emailTemplate)
}

export function resellerLabel (reseller) {
    return idAndNameLabel(reseller)
}
