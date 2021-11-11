<template>
    <q-page
        class="q-pa-md row justify-center"
    >
        <aui-system-stat-card
            v-if="$aclCan('read', 'page.dashboard.card.systemstat') && isSystemStatAvailable"
            :icons-default-color="iconsDefaultColor"
        />
        <aui-customer-card
            v-if="$aclCan('read', 'page.dashboard.card.customer')"
            :icons-default-color="iconsDefaultColor"
        />
        <aui-domain-card
            v-if="$aclCan('read', 'page.dashboard.card.domain')"
            :icons-default-color="iconsDefaultColor"
        />
        <aui-billing-card
            v-if="$aclCan('read', 'page.dashboard.card.billing.$has')"
            :icons-default-color="iconsDefaultColor"
        />
        <aui-peering-card
            v-if="$aclCan('read', 'page.dashboard.card.peering')"
            :icons-default-color="iconsDefaultColor"
        />
        <aui-reseller-card
            v-if="$aclCan('read', 'page.dashboard.card.reseller')"
            :icons-default-color="iconsDefaultColor"
        />
    </q-page>
</template>

<script>
import { mapState } from 'vuex'
import AuiSystemStatCard from 'components/dashboard/AuiSystemStatCard'
import AuiBillingCard from 'components/dashboard/AuiBillingCard'
import AuiPeeringCard from 'components/dashboard/AuiPeeringCard'
import AuiResellerCard from 'components/dashboard/AuiResellerCard'
import AuiCustomerCard from 'components/dashboard/AuiCustomerCard'
import AuiDomainCard from 'components/dashboard/AuiDomainCard'
export default {
    name: 'AuiDashboardPage',
    components: {
        AuiSystemStatCard,
        AuiBillingCard,
        AuiPeeringCard,
        AuiResellerCard,
        AuiCustomerCard,
        AuiDomainCard
    },
    computed: {
        ...mapState('user', [
            'platformInfo'
        ]),
        isSystemStatAvailable () {
            return ['sppro', 'carrier'].includes(this.platformInfo?.type)
        },
        iconsDefaultColor () {
            return 'grey-6'
        }
    }
}
</script>
