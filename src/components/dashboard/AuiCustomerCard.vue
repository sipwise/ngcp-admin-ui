<template>
    <aui-dashboard-card
        :title="$t('Customers')"
        :count="customersCount"
        :count-title="$t('Customer | Customers', Number(customersCount || 0))"
        :button-title="$t('Configure')"
        :button-route-to="{ name: 'customerList' }"
        :items-list="customerItems"
        :loading="$wait.is('loading-customerCardInfo')"
        :error="customerCardInfoHasError"
    />
</template>

<script>
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import AuiDashboardCard from 'components/dashboard/AuiDashboardCard'
export default {
    name: 'AuiCustomerCard',
    components: { AuiDashboardCard },
    props: {
        iconsDefaultColor: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState('dashboard', [
            'customerCardInfo',
            'customerCardInfoHasError'
        ]),
        customersCount () {
            return this.customerCardInfo?.customers
        },
        customerItems () {
            return [
                {
                    icon: { name: 'fas fa-address-card', color: this.iconsDefaultColor },
                    title: this.$t('Contact | Contacts', Number(this.customerCardInfo?.contacts || 0)),
                    value: this.customerCardInfo?.contacts
                },
                {
                    icon: { name: 'fas fa-user', color: this.iconsDefaultColor },
                    title: this.$t('Subscriber | Subscribers', Number(this.customerCardInfo?.subscribers || 0)),
                    value: this.customerCardInfo?.subscribers
                }
            ]
        }
    },
    async mounted () {
        await this.fetchCustomerCardInfo()
    },
    methods: {
        ...mapWaitingActions('dashboard', {
            fetchCustomerCardInfo: 'loading-customerCardInfo'
        })
    }
}
</script>
