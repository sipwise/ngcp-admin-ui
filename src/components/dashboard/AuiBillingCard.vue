<template>
    <aui-dashboard-card
        :title="$t('Billing')"
        :count="billingCount"
        :count-title="$t('Billing Profile | Billing Profiles', Number(billingCount || 0))"
        :button-title="$t('Configure')"
        :button-route-to="{ name: 'billingProfileList' }"
        :items-list="billingItems"
        :loading="$wait.is('loading-billingCardInfo')"
        :error="billingCardInfoHasError"
    />
</template>

<script>
import AuiDashboardCard from 'components/dashboard/AuiDashboardCard'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiBillingCard',
    components: { AuiDashboardCard },
    props: {
        iconsDefaultColor: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState('dashboard', [
            'billingCardInfo',
            'billingCardInfoHasError'
        ]),
        billingCount () {
            return this.billingCardInfo?.profiles
        },
        billingItems () {
            const getCorrectedValue = (value) =>
                (this.billingCardInfoHasError && value === undefined) ? null : (Number(value || 0) / 100.0).toFixed(2)

            const items = [
                {
                    acl: 'page.dashboard.card.billing.peeringCosts',
                    icon: { name: 'fas fa-money-check-alt', color: this.iconsDefaultColor },
                    title: this.$t('Peering Costs'),
                    value: getCorrectedValue(this.billingCardInfo?.peeringSum)
                },
                {
                    acl: 'page.dashboard.card.billing.resellerRevenue',
                    icon: { name: 'fas fa-dollar-sign', color: this.iconsDefaultColor },
                    title: this.$t('Reseller Revenue'),
                    value: getCorrectedValue(this.billingCardInfo?.resellerSum)

                },
                {
                    acl: 'page.dashboard.card.billing.resellerCost',
                    icon: { name: 'fas fa-money-check-alt', color: this.iconsDefaultColor },
                    title: this.$t('Reseller Cost'),
                    value: getCorrectedValue(this.billingCardInfo?.resellerSum)

                },
                {
                    acl: 'page.dashboard.card.billing.customerRevenue',
                    icon: { name: 'fas fa-dollar-sign', color: this.iconsDefaultColor },
                    title: this.$t('Customer Revenue'),
                    value: getCorrectedValue(this.billingCardInfo?.customerSum)
                }
            ]

            return items.filter((item) => this.$aclCan('read', item.acl))
        }
    },
    async mounted () {
        await this.fetchBillingCardInfo()
    },
    methods: {
        ...mapWaitingActions('dashboard', {
            fetchBillingCardInfo: 'loading-billingCardInfo'
        })
    }
}
</script>
