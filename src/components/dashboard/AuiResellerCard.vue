<template>
    <aui-dashboard-card
        :title="$t('Resellers')"
        :count="resellersCount"
        :count-title="$tc('Reseller | Resellers', Number(resellersCount || 0))"
        :button-title="$t('Configure')"
        :button-route-to="{ name: 'resellerList' }"
        :items-list="resellersItems"
        :loading="$wait.is('loading-resellerCardInfo')"
        :error="resellersCardInfoHasError"
    />
</template>

<script>
import AuiDashboardCard from 'components/dashboard/AuiDashboardCard'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerCard',
    components: { AuiDashboardCard },
    props: {
        iconsDefaultColor: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState('dashboard', [
            'resellersCardInfo',
            'resellersCardInfoHasError'
        ]),
        resellersCount () {
            return this.resellersCardInfo?.resellers
        },
        resellersItems () {
            return [
                {
                    icon: { name: 'fas fa-network-wired', color: this.iconsDefaultColor },
                    title: this.$t('Domain | Domains', Number(this.resellersCardInfo?.domains || 0)),
                    value: this.resellersCardInfo?.domains
                },
                {
                    icon: { name: 'fas fa-user-tie', color: this.iconsDefaultColor },
                    title: this.$t('Customer | Customers', Number(this.resellersCardInfo?.customers || 0)),
                    value: this.resellersCardInfo?.customers
                },
                {
                    icon: { name: 'fas fa-user', color: this.iconsDefaultColor },
                    title: this.$t('Subscriber | Subscribers', Number(this.resellersCardInfo?.subscribers || 0)),
                    value: this.resellersCardInfo?.subscribers
                }
            ]
        }
    },
    async mounted () {
        await this.fetchResellerCardInfo()
    },
    methods: {
        ...mapWaitingActions('dashboard', {
            fetchResellerCardInfo: 'loading-resellerCardInfo'
        })
    }
}
</script>
