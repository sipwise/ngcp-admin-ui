<template>
    <aui-details-page
        v-bind="$attrs"
        :menu-items-modifier="menuItemsModifier"
        :resource-object="customerContext"
    />
</template>

<script>
import _ from 'lodash'
import AuiDetailsPage from 'pages/AuiDetailsPage'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiCustomerDetailsPage',
    components: { AuiDetailsPage },
    mixins: [
        customerContextMixin
    ],
    methods: {
        menuItemsModifier ({ item, route }) {
            const requiredCustomerType = _.get(route.meta, 'customerType')
            const hasRequiredCustomerType = requiredCustomerType &&
                requiredCustomerType === this.customerContext.type
            const hasNoRestrictions = !requiredCustomerType
            if (hasNoRestrictions || hasRequiredCustomerType) {
                return item
            }
            return null
        }
    }
}
</script>
