import {
    billingNetworkLabel,
    billingProfileLabel,
    contactLabel,
    currencyLike,
    emailTemplateLabel,
    formatPhoneNumber,
    profilePackageLabel
} from 'src/filters/resource'

export default ({ app }) => {
    app.config.globalProperties.$filters = {
        billingProfileLabel,
        billingNetworkLabel,
        profilePackageLabel,
        emailTemplateLabel,
        contactLabel,
        currencyLike,
        formatPhoneNumber
    }
}
