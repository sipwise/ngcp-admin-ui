<template>
    <aui-details-page
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #menu>
            <aui-detail-page-menu
                :menu-items-modifier="menuItemsModifier"
            />
        </template>
    </aui-details-page>
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import AuiDetailPageMenu from 'components/AuiDetailPageMenu'
import subContext from 'src/mixins/sub-context'
export default {
    name: 'AuiSubscriberDetailsPage',
    components: { AuiDetailPageMenu, AuiDetailsPage },
    mixins: [
        subContext
    ],
    methods: {
        menuItemsModifier (item, route) {
            if ((route?.meta?.capability && !this.$capability(route.meta.capability)) ||
                (route?.meta?.visibleOnlyForCustomerType &&
                route.meta.visibleOnlyForCustomerType !== this?.resourceObject?.['customer_id_expand']?.type) ||
                (route?.meta?.visibleOnlyForSubscriberType && !this.isSubscriberHasCorrectType(route?.meta?.visibleOnlyForSubscriberType))
            ) {
                return null
            }
            return item
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
