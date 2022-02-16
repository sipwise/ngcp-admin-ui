<template>
    <aui-details-page
        v-bind="$attrs"
        :menu-items-modifier="menuItemsModifier"
        :resource-object="subscriberContext"
        v-on="$listeners"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import _ from 'lodash'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsPage',
    components: { AuiDetailsPage },
    mixins: [
        subscriberContextMixin
    ],
    methods: {
        menuItemsModifier ({ item, route }) {
            const requiredCustomerType = _.get(route.meta, 'customerType')
            const hasRequiredCustomerType = requiredCustomerType &&
                requiredCustomerType === this.subscriberContextCustomer.type
            const requiredSubscriberType = _.get(route.meta, 'subscriberType')
            const hasRequiredSubscriberType = requiredSubscriberType &&
                requiredSubscriberType === this.subscriberContextType
            const hasNoRestrictions = !requiredCustomerType && !requiredSubscriberType
            if (hasNoRestrictions || (hasRequiredCustomerType && !requiredSubscriberType) ||
                (hasRequiredCustomerType && hasRequiredSubscriberType)) {
                return item
            }
            return null
        }
    }
}
</script>
