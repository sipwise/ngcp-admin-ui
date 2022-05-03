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
import { mapState } from 'vuex'
export default {
    name: 'AuiCustomerDetailsPage',
    components: { AuiDetailPageMenu, AuiDetailsPage },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        menuItemsModifier (item, route) {
            if (
                (route?.meta?.visibleOnlyForCustomerType &&
                route.meta.visibleOnlyForCustomerType !== this?.resourceObject?.type)
            ) {
                return null
            }
            return item
        }
    }
}
</script>
