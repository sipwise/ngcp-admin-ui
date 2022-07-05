<template>
    <aui-details-page
        v-bind="$attrs"
        :menu-items-modifier="menuItemsModifier"
        :resource-object="customerContext"
        v-on="$listeners"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiCustomerDetailsPage',
    components: { AuiDetailsPage },
    mixins: [
        customerContextMixin
    ],
    methods: {
        menuItemsModifier ({ item, route, resourceObject }) {
            if (route?.meta?.visibleOnlyForCustomerType === undefined ||
            (resourceObject.type && route?.meta?.visibleOnlyForCustomerType === resourceObject.type)) {
                return item
            }
            return null
        }
    }
}
</script>
