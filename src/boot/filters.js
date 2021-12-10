import {
    billingProfileLabel,
    billingNetworkLabel,
    profilePackageLabel,
    emailTemplateLabel,
    contactLabel,
    currencyLike
} from 'src/filters/resource'

export default ({ Vue }) => {
    Vue.filter('billingProfileLabel', billingProfileLabel)
    Vue.filter('billingNetworkLabel', billingNetworkLabel)
    Vue.filter('profilePackageLabel', profilePackageLabel)
    Vue.filter('contactLabel', contactLabel)
    Vue.filter('emailTemplateLabel', emailTemplateLabel)
    Vue.filter('currencyLike', currencyLike)
}
