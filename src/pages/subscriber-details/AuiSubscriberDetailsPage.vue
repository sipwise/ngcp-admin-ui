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
        menuItemsModifier ({ item, route, resourceObject }) {
            const hasCustomerType = _.has(route.meta, 'visibleOnlyForCustomerType')
            const requiredCustomerType = _.get(route.meta, 'visibleOnlyForCustomerType')
            const hasRequiredCustomerType = hasCustomerType && resourceObject.customer_id_expand &&
                requiredCustomerType === resourceObject.customer_id_expand.type
            const hasSubscriberType = _.has(route.meta, 'visibleOnlyForSubscriberType')
            const requiredSubscriberType = _.get(route.meta, 'visibleOnlyForSubscriberType')
            const hasRequiredSubscriberType = hasSubscriberType && this.isSubscriberHasCorrectType(requiredSubscriberType)
            const hasNoRestrictions = !hasCustomerType && !hasSubscriberType
            if (hasNoRestrictions || hasRequiredCustomerType || hasRequiredSubscriberType) {
                return item
            }
            return null
        },
        isSubscriberHasCorrectType (requiredType) {
            switch (requiredType) {
            case 'subscriber':
                return this?.resourceObject?.['is_pbx_group'] === false
            case 'pbxgroup':
                return this?.resourceObject?.['is_pbx_group'] === true
            default:
                return null
            }
        }
    }
}
</script>
