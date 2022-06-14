<template>
    <aui-details-page
        v-bind="$attrs"
        :menu-items-modifier="menuItemsModifier"
        :resource-object="resourceObject"
        v-on="$listeners"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import subContext from 'src/mixins/sub-context'
export default {
    name: 'AuiCustomerDetailsPage',
    components: { AuiDetailsPage },
    mixins: [
        subContext
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
